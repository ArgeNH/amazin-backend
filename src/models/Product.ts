import { Schema, Document, model } from 'mongoose';

interface Product extends Document {
    code: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    urlImage: string;
    public_id: string;
}

const ProductSchema = new Schema<Product>({
    code: {
        type: String,
        required: [true, 'The code is neccesary'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'The name is neccesary']
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: [true, 'The price is neccesary']
    },
    stock: {
        type: Number,
        required: [true, 'The stock is neccesary']
    },
    category: {
        type: String,
        required: [true, 'The category is neccesary'],
        enum: ['electronics', 'clothes', 'food', 'others']
    },
    urlImage: {
        type: String,
        required: true
    },
    public_id: {
        type: String
    }
});

export default model<Product>('Product', ProductSchema);