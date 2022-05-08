import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controller/product';
import multer from 'multer';

const upload = multer({ dest: './amazin' });

const router = Router();

router.post('/new-product', upload?.array('image', 1), createProduct);
router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.patch('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export { router as product }