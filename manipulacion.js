import data from './local_db/products.json' with {type: 'json'};



const availableProducts = data.filter(product => product.disponible === true);





