# API de Productos y Categorías

Una API RESTful para gestionar productos y categorías con validación de datos, transacciones de base de datos y relaciones entre entidades.

## 🚀 Características

- **Gestión de Productos**: CRUD completo para productos
- **Gestión de Categorías**: CRUD completo para categorías
- **Validación de Datos**: Usando Zod para validación robusta
- **Relaciones**: Los productos están asociados a categorías
- **Transacciones**: Operaciones de base de datos seguras
- **Filtros**: Obtener productos disponibles
- **Validaciones de Negocio**: No se pueden eliminar categorías con productos asociados

## 📋 Requisitos

- Node.js
- MySQL
```bash
npm install mysql2
```
- Express.js
```bash
npm install express
```
- Zod (validación)
```bash
npm install zod
```
- Pool de conexiones MySQL
-nodemon
```bash
npm install --save-dev nodemon
```



## ⚙️ Configuración de Base de Datos

### 1. Crear archivo de configuración `config/db.js`

```javascript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'productos_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
```

### 2. Crear servidor principal `app.js`

```javascript
import express from 'express';
import RouterProducts from './routes/products.routes.js';
import categoryRoutes from './routes/category.routes.js';

const app = express();
const PORT = 3012;

// Middleware
app.use(express.json());

// Rutas
app.use('/products', RouterProducts);
app.use('/categorias', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```



## 🔗 Endpoints

### Productos

#### Obtener todos los productos
```http
GET http://localhost:3012/products
```

#### Obtener producto por ID
```http
GET http://localhost:3012/products/2
```

#### Obtener productos disponibles
```http
GET http://localhost:3012/products/disponibles
```

#### Crear un nuevo producto
```http
POST http://localhost:3012/products
Content-Type: application/json

{
  "id": 9,
  "nombre": "TV 55 samsung 4k",
  "precio": 20000,
  "descripcion": "Televisor Samsung 4K de 55 pulgadas",
  "disponible": true,
  "fecha_ingreso": "2021-10-15",
  "categoriaId": 2
}
```

#### Actualizar un producto
```http
PUT http://localhost:3012/products/actualizar/8
Content-Type: application/json

{
  "nombre": "Iphone 16 pro max xd",
  "precio": 20000,
  "descripcion": "Nuevo Iphone 16 pro max",
  "disponible": true,
  "fecha_ingreso": "2025-07-13",
  "categoriaId": 1
}
```

#### Eliminar un producto
```http
DELETE http://localhost:3012/products/eliminar/9
```

### Categorías

#### Obtener todas las categorías
```http
GET http://localhost:3012/categorias
```

#### Obtener categoría por ID
```http
GET http://localhost:3012/categorias/4
```

#### Crear una nueva categoría
```http
POST http://localhost:3012/categorias
Content-Type: application/json

{
  "id": 5,
  "nombre": "Carpintería y muebles"
}
```

#### Actualizar una categoría
```http
PUT http://localhost:3012/categorias/5
Content-Type: application/json

{
  "nombre": "Carpintería y muebles ..."
}
```

#### Eliminar una categoría
```http
DELETE http://localhost:3012/categorias/2
```

## 📝 Validaciones

### Productos
- **ID**: Debe ser un número
- **Nombre**: String, máximo 50 caracteres
- **Precio**: Número, mínimo 1
- **Descripción**: String, máximo 100 caracteres
- **Disponible**: Booleano
- **Fecha de ingreso**: Formato de fecha válido
- **Categoría ID**: Debe ser un número y existir en la tabla categorías

### Categorías
- **ID**: Debe ser un número
- **Nombre**: String, máximo 50 caracteres, obligatorio y único


## 🚦 Códigos de Estado

- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Error en los datos enviados
- **404**: Recurso no encontrado
- **500**: Error interno del servidor

## 🔧 Configuración

### Variables de entorno recomendadas

```env
DB_HOST=host
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=name_db
PORT=port
```

### Configuración de package.json

```json
{
  "name": "productos-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "zod": "^3.21.4"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## 📚 Uso

1. **Iniciar el servidor**:
```bash
npm run dev
```
2. **Encender el contendor docker**



3. La API estará disponible en `http://localhost:3012`

4. Usa herramientas como Postman, Thunder Client o curl para probar los endpoints, se recomienda ResClient.



