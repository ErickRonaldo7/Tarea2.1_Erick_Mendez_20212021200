import pool from '../config/db.js';

export const getAllCategoriesDB = async()=>{

    const query = `Select c.id,c.nombre from categorias as c`
    const [results] = await pool.query(query)
    return results
}

export const getCategoryByIdDB = async(id) => {
    const query = `Select c.id,c.nombre from categorias as c where c.id = ?`
    const [results] = await pool.query(query, [id])
    return results

}

export const createCategoryDB = async (id, category) => {

    const query = `Insert into categorias (id, nombre) values (?,?)`
    const [result] = await pool.query(query, [id, category.nombre])
    return result 

}

export const updateCategoryDB = async (id, nombre) => {
    const query = `Update categorias set nombre = ? where id = ?`
    const [result] = await pool.query(query, [nombre, id])
    return result
}


export const checkCategoriaHasProducts = async (categoriaId) => {
  const query = `SELECT id FROM productos WHERE categoria_id = ? LIMIT 1;`;
  const [result] = await pool.query(query, [categoriaId]);
  return result.length > 0;
};

export const deleteCategoriaById = async (categoriaId, conn) => {
  const query = `DELETE FROM categorias WHERE id = ?;`;
  const [result] = await conn.execute(query, [categoriaId]);
  return result.affectedRows;
};