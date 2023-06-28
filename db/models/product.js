const client = require("../client");

async function createProduct({ name, description, image, price, stock }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
INSERT INTO products(name, description, image, price, stock)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
`,
      [name, description, image, price, stock]
    );
    return product;
  } catch (error) {
    console.error(error);
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(
      `
    SELECT * FROM products
    `
    );
    return products;
  } catch (error) {
    console.error(error);
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    UPDATE products
    SET ${setString}
    WHERE id = $1
    RETURNING *
    `,
      [id, ...Object.values(fields)]
    );
    return product;
  } catch (error) {
    console.error(error);
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * FROM products
    WHERE id = $1
    `,
      [id]
    );
    return product;
  } catch (error) {
    console.error(error);
  }
}

async function deleteProduct(id) {
  try {
    const {
      rows: [res],
    } = await client.query(
      `
        DELETE products
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductById,
  deleteProduct,
};
