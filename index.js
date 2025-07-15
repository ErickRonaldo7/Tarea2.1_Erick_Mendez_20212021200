import express from 'express';
import RouterProducts from './routes/products.routes.js';
import CategoryRoutes from './routes/category.routes.js';



const app = express();
const port = process.env.PORT || 3012;


app.use (express.json());
app.use ('/products',RouterProducts);
app.use ('/categorias', CategoryRoutes)


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto :${port}`);
});     