import { Request, Response } from 'express';

import User from '../models/User';

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