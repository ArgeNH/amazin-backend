import { Request, Response } from 'express';
import { v2 } from 'cloudinary';
import { v4 } from 'uuid';

import Product from '../models/Product';

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock, category } = req.body;
    try {
        const file = req?.files as Express.Multer.File[];
        const { public_id, secure_url } = await v2.uploader.upload(file[0].path);
        const uid = v4();

        const product = new Product({
            code: uid,
            name,
            description,
            price,
            stock,
            category,
            urlImage: secure_url,
            public_id
        });

        await product.save();

        return res.status(201).json({
            success: true,
            message: 'Product created successfully'
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const product = await Product.find({});
        if (!product) return res.status(400).json({
            success: false,
            message: 'Products not found'
        });
        return res.status(200).json({
            success: true,
            message: 'Products found successfully',
            product
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    const { code } = req.params;
    try {

        const product = await Product.findOne({ code });

        if (!product) return res.status(400).json({
            success: false,
            message: 'Product not found'
        });

        return res.status(200).json({
            success: true,
            message: 'Product found successfully',
            product
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        console.log(code)
        const { name, description, price, stock, category } = req.body;
        const product = await Product.findOneAndUpdate({ code }, { name, description, price, stock, category }, { new: true });
        console.log(product)
        if (!product) return res.status(400).json({
            success: false,
            message: 'Product not found'
        });

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const product = await Product.findOneAndDelete({ code });

        if (!product) return res.status(400).json({
            success: false,
            message: 'Product not found'
        });

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}