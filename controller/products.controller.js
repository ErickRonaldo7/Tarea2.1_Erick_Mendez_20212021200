import products from '../local_db/products.json' with { type: 'json' };
import {validateProduct} from '../schema/products.schema.js';
import { getAll, 
        getById, 
        availableProducts,
        createPro,
        updateProductDB,
        deleteProductDB


} from '../model/products.js';

export const getAllProducts = async (req,res) =>{


    try{
          const productsDb = await getAll()
          res.status(200).json(productsDb);
    }catch (error){
          res.status(500).json({message: 'Error al obtener los productos', error})
    }
  


}

export const getProductById = async (req,res) =>{

    const {id} = req.params

   //const ProductId = products.find(product => product.id === parseInt(id))

   

    try{
        const productIdDB = await getById(id)
        if (isNaN(id)) {
            return res.status(400).json({message: 'Debe elegir un ID valido'})
        }
        if (!productIdDB) {
            return res.status(404).json({message: 'Producto no encontrado'})
        }
    res.status(200).json(productIdDB)
    }catch(error){
        res.status(500).json({message: 'Error al obtener el producto', error})
    }
  

}

export const getAvailableProducts = async (req,res) =>{

    //const availableProducts = products.filter(product => product.disponible === true)


    const availableProductsDB = await availableProducts()


    if (availableProductsDB.length === 0) {
        return res.status(404).json({message: 'Not Found products'})
    }

    res.json(availableProductsDB)
}


export const createProduct = async (req, res) => {
  const product = req.body;
  const catId = req.body.categoriaId;

  if (!catId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  const { success, error, data: safeInsertData } = validateProduct(product);

  if (!success) {
    return res.status(400).json(error);
  }

  // Agregar el campo esperado en la base de datos
  safeInsertData.categoria_id = catId;

  try {
    const insertProductDB = await createPro(safeInsertData);
    res.status(201).json(insertProductDB);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

export const updateProduct = async (req,res)=>{

    const {id} = req.params 
    const parsedID = Number(id)

  if (isNaN(parsedID)) {
        return res.status(400).json({message: 'Product ID is required'})
    }

    //const findIndex = products.findIndex(product => product.id === parsedID)

    /* if (findIndex === -1){
        return res.status(404).json({message: 'Product not found'})
    }
 */

    const dataToUpdate = req.body
    const {success,error,data: safeInsertData} = validateProduct(dataToUpdate)

    if (!success) {
        return res.status(400).json(error)
    }

    const updateProductdb = await updateProductDB(parsedID, safeInsertData)

    if (!updateProductdb) {
        return res.status(404).json({message: 'Product not found'})
    }

    res.status(200).json({message: 'Producto actualizado correctamente', data: safeInsertData});

}

export const deleteProduct = async (req,res)=>{

    const {id} = req.params 
    const parsedID = Number(id)

    if (isNaN(parsedID)){
        return res.status(400).json({message: 'Product ID is required'})

    }

    /* const findIndex = products.findIndex(product => product.id === parsedID)

      if (findIndex === -1){
        return res.status(404).json({message: 'Product not found to delete'})
     } 

     products.splice(findIndex,1)  */

     //204 es estandar para eliminaciones exitosas.
     //res.status(204)


     const deleteProductdb = await deleteProductDB(parsedID)
     res.status(200).json({message: 'Producto eliminado correctamente'})

}