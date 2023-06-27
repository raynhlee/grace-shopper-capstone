const client = require('../client');


async function createProduct({name, description, image, price, stock}) {
try{
const {rows:[product]} = await client.query(`
INSERT INTO products(name, description, image, price, stock)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
`,[name, description, image, price, stock]);
return product;

} catch(error){
console.error(error)
}
}


module.exports = {
createProduct
}
