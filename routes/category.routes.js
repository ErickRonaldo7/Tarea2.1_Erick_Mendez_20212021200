import {Router} from 'express';

import {
    getAllCategories,
    categoryById,
    createCategory,
    updateCategory,
    deleteCategory
}from '../controller/category.controller.js';

const categoryRoutes = Router()

categoryRoutes.get('/', getAllCategories)
categoryRoutes.get('/:id', categoryById)
categoryRoutes.post('/', createCategory)|
categoryRoutes.put('/:id', updateCategory)
categoryRoutes.delete('/:id',deleteCategory)



export default categoryRoutes;