import { Request, Response } from 'express';
import { generate } from 'generate-password-ts';
import { genSaltSync, hashSync } from 'bcrypt';

import User from '../models/User';
import { transporter } from '../helpers';

export const getUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email }, { password: 0, __v: 0, oldPassword: 0 });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The user is not registered'
        });
        return res.status(200).json({
            success: true,
            message: 'User found successfully',
            user
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find({}, { password: 0, __v: 0, oldPassword: 0 });
        if (!users) return res.status(400).json({
            success: false,
            message: 'Users not found'
        });
        return res.status(200).json({
            success: true,
            message: 'Users found successfully',
            users
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    const { name, lastName } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { name, lastName }, { new: true });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The user is not registered'
        });
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const user = await User.findOneAndDelete({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The user is not registered'
        });
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The user is not registered'
        });


        if (user.attempts === 3) return res.status(400).json({
            success: false,
            message: 'Your account has been blocked contact with the administrator'
        });

        const aleatoryPassword: string = generate({
            length: 16,
            numbers: true,
            symbols: true
        });

        const salt = genSaltSync(10);
        user.password = hashSync(aleatoryPassword, salt);
        user.firstLogin = true;
        await user.save();

        const mailOptions = {
            from: 'ADMIN - AMAZIM',
            to: user.email,
            subject: 'Forgot password in AMAZIM',
            html: `<h1>Generate new password</h1>
            <p>Your new password generate is: <strong>${aleatoryPassword}</strong></p>
            <p><strong>Please change it after you login</strong></p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
            else console.log(`Email sent: ${info.response}`);
        });

        return res.status(200).json({
            success: true,
            message: 'Your new password has been sent to your email',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}