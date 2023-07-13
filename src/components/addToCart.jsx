import React from 'react';
import { fetchFromAPI } from '../api';

const AddToCart = ({product, count, setCount, setProducts, user}) => {

    const addToCart = async (product) => {
        setCount(count + 1);
        let newStock = product.stock - 1;

        console.log('count: ', count )
    
        if (count === 8) {
          //todo createOrder
          const order = await fetchFromAPI({
            path: "/orders",
            method: "POST",
            body: {
              userId: user.id,
              productId: product.id,
              price: product.price,
              quantity: 1,
            }
          });
          localStorage.setItem("orderid", order.id);
          console.log('order: ', order )
         

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

        if (count >= 2) {
          await fetchFromAPI({
            path: "/orders",
            method: "PATCH",
          });
        }


      };
    
      return(
        <button onClick={() => addToCart(product)}
                    id='add-to-cart-button'>Add to cart</button>
      )

}

export default AddToCart;