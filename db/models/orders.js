const client = require("../client");

async function createOrder({ userId, productId, price, quantity }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId", "productId", price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
      [userId, productId, price, quantity]
    );

    return order;
  } catch (error) {
    console.error(error);
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
            SELECT * FROM orders
        `);

    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        SELECT * FROM orders
        WHERE id = $1;
    `,
      [id]
    );

    return order;
  } catch (error) {
    console.error(error);
  }
}

async function getOrderByUser({ username }) {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT o.*, u.username
            AS "customerName"
            FROM orders o
            INNER JOIN users u
            ON o."userId" = u.id
            WHERE u.username = $1;
        `,
      [username]
    );

    //todo new
    const productids = orders.map((order) => order.productId).join(",");

    const { rows: orderedProducts } = await client.query(
      `select p.name,p.description,p.price,p.image from products p where p.id in (${productids})`
    );

    //todo new
    const myOrders = await Promise.all(
      orders.map(async (order) => {
        order.products = [];
        if (orderedProducts) order.products = orderedProducts;
        return order;
      })
    );

    return myOrders;
  } catch (error) {
    console.error("Error while getting order by user", error);
  }
}

async function updateOrder({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, idx) => `"${key}" = $${idx + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE 
            orders
        SET
            ${setString}
        WHERE id = ${Object.keys(fields).length + 1}
        RETURNING *;
    `,
      [...Object.values(fields), id]
    );

    return order;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUser,
  updateOrder,
};
