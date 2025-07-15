import pool from '../config/db.js';

export const getAll = async()=>{
      const query = `SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    p.categoria_id   
                    FROM productos as p
                    GROUP BY p.id; `

  const [results] = await pool.query(query);

  return results
}



export const getById = async (id) =>{

    const query = `SELECT
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    p.categoria_id   
                    FROM productos as p
                    WHERE p.id = ?;`

    const [data] = await pool.query(query, [id]);

    return data
}

export const availableProducts = async()=>{

    const query = `
                    SELECT 
                    p.id,
                    p.nombre,
                    p.precio,
                    p.descripcion,
                    p.disponible,
                    p.fecha_ingreso,
                    p.categoria_id
                    FROM productos as p
                    WHERE p.disponible = ?;`

    const [data] = await pool.query(query, [true]);

    return data
}

export const createPro = async(newProduct) =>{

       const conn = await pool.getConnection();
try {
  await conn.beginTransaction();
  
  const { id, nombre, precio, descripcion, disponible, fecha_ingreso, categoria_id } = newProduct;

  const query = `INSERT INTO productos (id, nombre, precio, descripcion, disponible, fecha_ingreso, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  await conn.execute(query, [id, nombre, precio, descripcion, disponible, fecha_ingreso, categoria_id]);
  
  await conn.commit();

  return newProduct;
} catch (error) {
  await conn.rollback();
  throw error;
} finally {
  conn.release();
}
}


export const updateProductDB = async(id, data) =>{

 

  try{

    const {nombre, precio, descripcion, disponible, fecha_ingreso, categoriaId } = data;

    const query = `update productos 
                    set nombre = ?,
                        precio = ?,
                        descripcion = ?,
                        disponible = ?,
                        fecha_ingreso = ?,
                        categoria_id = ?
                    where id = ?;
                    `

  const [result]  = await pool.query(query, [nombre, precio, descripcion, disponible, fecha_ingreso, categoriaId, id]);
  return result;

  }catch(error){
   return { success: false, error: 'Error actualizando el producto', details: error };
  }
} 


export const deleteProductDB = async (id)=>{

  try{

    const query = `Delete from productos where id = ?`

    const [result] = await pool.query(query, [id]);
    return result;

  }catch(error){
    return { success: false, error: 'Error eliminando el producto', details: error };
  }

}