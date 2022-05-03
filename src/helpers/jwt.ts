import jwt from 'jsonwebtoken';

export interface UserToken {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
    status: boolean;
    firstLogin: boolean;
    attempts: number;
}

const secret: string = `${process.env.JWT_SECRET}`;

export const generateJWT = (user: UserToken): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        jwt.sign(user, secret, { 
            expiresIn: '5m' 
        },(err, token) => {
            if (err) reject(`Can't generate token: ${err.message}`);
            resolve(token);
        });
    });
}