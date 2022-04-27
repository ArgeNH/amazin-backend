import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controller/product';

const router = Router();

router.post('/new-product', createProduct);
router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.patch('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;