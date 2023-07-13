import React from 'react'

const CartFunctionComponent = () => {

    const addToCart = async (product) => {
        setCount(count + 1);
        let newStock = product.stock - 1;
    
        if (count === 1) {
          //todo createOrder
          const order = await fetchFromAPI({
            path: "/orders",
            method: "POST",
            body: {
              userId: user.id,
              productId: product.id,
              price: product.price,
              quantity: 1,
            },
            token: user.token,
          });
          localStorage.setItem("orderid", order.orderid);
    
          //todo updateProduct
          await fetchFromAPI({
            path: "/products",
            id: product.id,
            stock: newStock,
          });
    
          //todo getAllProducts
          Promise.all([await fetchFromAPI({ path: "/products" })]).then(
            ([data]) => {
              setProducts(data);
            }
          );
        }
      };
    

}

export default CartFunctionComponent;