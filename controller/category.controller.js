import data from '../local_db/products.json' with {type: 'json'};
import category from '../local_db/categories.json' with {type: 'json'};
import {safeCategory} from '../schema/category.schema.js';
import {getAllCategoriesDB,
    getCategoryByIdDB,
    createCategoryDB,
    updateCategoryDB,
    checkCategoriaHasProducts,
    deleteCategoriaById //por aqui me quede en a eliminacion de categoria, falta la logica en controller 
} from '../model/categorias.js';
import pool from '../config/db.js';




export const getAllCategories = async (req, res) =>{


    const categoryidbd = await getAllCategoriesDB()
    res.json(categoryidbd)
}


export const categoryById = async (req, res) =>{

    const {id} = req.params
    const parsedId = Number(id);

    

    /* const categoryid  = category.find(cat => cat.id === parsedId);

    if (!categoryid){
        return res.status(404).json({message: 'Category no encontrada'});
    } */
   const getbyiddb = await getCategoryByIdDB(parsedId);
    if (getbyiddb.length === 0) {
        return res.status(404).json({message: 'Category not found'});
    }

    res.json(getbyiddb);


}

/* - El nombre de la categoría debe ser obligatorio y único.
- Al crear un producto, `categoriaId` debe existir.
- No se puede eliminar una categoría si tiene productos asignados. 

**Solo me falta validar que no se pueda eliminar una categoría si tiene productos asignados.
*/
export const createCategory = async (req,res)=>{

    const newCategory = req.body
    const {nombre} = req.body
    const id = req.body.id 
    const parsedId = Number(id)

    if(!nombre) {
        return res.status(400).json({message: 'El nombre es obligatorio'})
    }
     const {success,error, data: safeInsertData} = safeCategory(newCategory)
    if (!success) {
        return res.status(400).json({message: 'Error en los datos', error})
    }
    const validateExists = category.find(cat =>cat.nombre.toLowerCase().trim() === nombre.toLowerCase().trim())
    if (validateExists) {
        return res.status(400).json({message: 'El nombre de la categoría ya existe'})
    }

   
    const newCatDB = await createCategoryDB(parsedId, safeInsertData);

    res.status(201).json(safeInsertData);
}
//aqui...

export const updateCategory = async (req,res)=>{

    const {id} = req.params
    const parsedId = Number(id)
    const {nombre} = req.body


    if (isNaN(parsedId)){

        return res.status(400).json({message: 'Invalid ID'})
    }

    /* const findIndex = category.findIndex(cat => cat.id === parsedId)

    if (findIndex === -1){
        return res.status(404).json({message: 'Category not found'})
    } */
    
    if(typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({message: 'El nombre es obligatorio y debe ser un texto'})
    }

    const dataToUpdate = await updateCategoryDB(parsedId, nombre);
   
   res.json({message: 'Categoria actualizada correctamente', data: {id: parsedId, nombre}});

}


export const deleteCategory = async (req,res) =>{

    const categoriaId = req.params.id;
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // Validación de negocio en el controller
    const tieneProductos = await checkCategoriaHasProducts(categoriaId);
    if (tieneProductos) {
      await conn.rollback();
      return res.status(400).json({
        mensaje: 'No se puede eliminar la categoría porque tiene productos asociados.'
      });
    }

    const eliminadas = await deleteCategoriaById(categoriaId, conn);
    if (eliminadas === 0) {
      await conn.rollback();
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    await conn.commit();
    return res.status(200).json({ mensaje: 'Categoría eliminada correctamente.' });

  } catch (error) {
    await conn.rollback();
    return res.status(500).json({ mensaje: 'Error del servidor.', error: error.message });
  } finally {
    conn.release();
  }
  
}