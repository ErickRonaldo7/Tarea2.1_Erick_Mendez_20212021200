import zod from 'zod'



const productSchema = zod.object({

    "id": zod.number({message: 'El ID debe ser un número'}),
   "nombre": zod.string({message: 'El nombre es un string'}).max(50),
    "precio": zod.number({message: 'El precio debe ser un número'}).min(1,{message: 'El precio debe ser mayor a 0'}),
    "descripcion": zod.string().max(100, {message: 'La descripción debe tener un máximo de 100 caracteres'}),
    "disponible": zod.boolean({message: 'El campo disponible debe ser un booleano'}),
    "fecha_ingreso": zod.string().date(),
    "categoriaId": zod.number({message: 'El ID de la categoría debe ser un número'}),


}).strict()

export const validateProduct = (product) =>{

    return productSchema.safeParse(product)
}

