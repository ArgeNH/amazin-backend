import { Request, Response } from 'express';

import User from '../models/User';

export const unlockUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: 'The user is not registered'
        });

        user.status = true;
        user.attempts = 0;
        await user.save();
        
        return res.status(200).json({
            success: true,
            message: 'User unlocked successfully'
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}