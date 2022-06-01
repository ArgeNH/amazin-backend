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
    console.log(name, description, price, stock, category);
    try {
        const file = req?.files as Express.Multer.File[];

        const { public_id, secure_url } = await v2.uploader.upload(file[0].path);
        console.log(public_id, secure_url);
        const uid = v4();
        console.log(uid);

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

export const getProduct = (_req: Request, _res: Response) => { }

export const updateProduct = (_req: Request, _res: Response) => { }

export const deleteProduct = (_req: Request, _res: Response) => { }