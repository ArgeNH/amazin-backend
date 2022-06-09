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
router.get('/product/:code', getProduct);
router.patch('/update-product/:code', updateProduct);
router.delete('/delete-product/:code', deleteProduct);

export { router as product }