import {Router} from 'express';

import {
    getAllProducts,
    getProductById,
    getAvailableProducts,
    createProduct,
    updateProduct,
    deleteProduct

}from '../controller/products.controller.js';


const RouterProducts = Router();

RouterProducts.get('/', getAllProducts);
RouterProducts.get('/disponibles', getAvailableProducts);
RouterProducts.get('/:id', getProductById);
RouterProducts.post('/',createProduct);
RouterProducts.put('/actualizar/:id',updateProduct );
RouterProducts.delete('/eliminar/:id',deleteProduct);


export default RouterProducts;
