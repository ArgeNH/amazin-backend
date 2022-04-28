import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    status: boolean;
    fisrtLogin: boolean;
}

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: [true, 'The email is neccesary'],
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    },
    fisrtLogin: {
        type: Boolean,
        default: true
    }
});

export default model<User>('User', UserSchema);