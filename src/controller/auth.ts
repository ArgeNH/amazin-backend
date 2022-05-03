import { Request, Response } from 'express';
import { generate } from 'generate-password-ts';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import User from '../models/User';
import { transporter } from '../helpers/mail';
import { generateJWT, UserToken } from '../helpers/jwt';

export const signUp = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({
            success: false,
            message: 'The email is already in use'
        });

        user = new User(req.body);

        const aleatoryPassword: string = generate({
            length: 16,
            numbers: true,
            symbols: true
        });

        const salt = genSaltSync(10);
        user.password = hashSync(aleatoryPassword, salt);
        await user.save();

        user.oldPassword.push(user.password);
        await user.save();

        const mailOptions = {
            from: 'ADMIN - AMAZIM',
            to: user.email,
            subject: 'Welcome to AMAZIM',
            html: `<h1>Welcome to AMAZIM</h1>
            <p>Your password generate is: <strong>${aleatoryPassword}</strong></p>
            <p><strong>Please change it after you login</strong></p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
            else console.log(`Email sent: ${info.response}`);
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The email is not registered'
        });

        const validPassword = compareSync(password, user.password);
        if (!validPassword && user.status === true) {
            if (user.attempts < 3) {
                user.attempts += 1;
                if (user.attempts === 3) user.status = false;
                await user.save();
                console.log(`Fallo de login ${user.attempts}`);
            }
            return res.status(400).json({
                success: false,
                message: 'The password/email is incorrect'
            });
        }

        if (user.status === false) {
            return res.status(400).json({
                success: false,
                message: 'Your account has been blocked contact with the administrator'
            });
        }

        const userData: UserToken = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            status: user.status,
            fisrtLogin: user.firstLogin,
            attempts: user.attempts
        };

        const token: string | undefined = await generateJWT(userData);

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                firstLogin: user.firstLogin
            },
            token
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    const { email } = req.params;
    const { newPassword } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The email is not registered'
        });

        const result = user.oldPassword.some(old => compareSync(newPassword, old));
        if (result) {
            return res.status(400).json({
                success: false,
                message: 'The new password is the same as the old one'
            });
        } else {
            user.oldPassword.pop();
        }

        const salt: string = genSaltSync(10);
        user.password = hashSync(newPassword, salt);
        user.oldPassword.unshift(user.password);
        user.firstLogin = false;
        await user.save();

        const userData: UserToken = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            status: user.status,
            fisrtLogin: user.firstLogin,
            attempts: user.attempts
        };

        const token = await generateJWT(userData);

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            token
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}