import { Request, Response } from 'express';

import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The user is not registered'
        });
        return res.status(200).json({
            success: true,
            message: 'User found successfully',
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

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
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

export const updateUser = async (_req: Request, _res: Response) => { }

export const deleteUser = async (_req: Request, _res: Response) => { }