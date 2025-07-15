import zod from 'zod'



const categorySchema = zod.object({

    "id": zod.number({message: 'El ID debe ser un número'}),
    "nombre": zod.string({message: 'El nombre debe ser texto'}).max(50, {message: 'El nombre no puede exceder los 50 caracteres'}.message),
    

    
}).strict()


export const safeCategory = (data)=>{

    return categorySchema.safeParse(data)
}
