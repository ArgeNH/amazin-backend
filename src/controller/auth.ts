import { Request, Response } from 'express';

import User from '../models/User';
import { transporter } from '../helpers/mail';

export const signUp = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({
            success: false,
            message: 'The email is already in use'
        });

        user = new User(req.body);

        const aleatoryPassword: string = Math.random().toString(36).slice(-16);
        user.password = aleatoryPassword;
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

        //without token yet

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status,
                fisrtLogin: user.fisrtLogin
            }
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const signIn = (_req: Request, _res: Response) => { }