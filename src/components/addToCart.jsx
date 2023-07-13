import React from 'react';
import { fetchFromAPI } from '../api';

const AddToCart = ({product, count, setCount, setProducts, user, onSingleProductPage}) => {

    const addToCart = async (product) => {
        
        let newStock = product.stock - 1;

      
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
          //localStorage.setItem("orderid", order.id);
          console.log('order: ', order )
         

          //todo updateProduct
          await fetchFromAPI({
            path: "/products",
            id: product.id,
            stock: newStock,
          });
    
        
        
        
       

      };
    
      return(
        <div>
        { onSingleProductPage
            ? <button onClick={() => addToCart(product)}
            id='single-product-add-to-cart'>Add to cart</button>
          : <button onClick={() => addToCart(product)}
                    id='add-to-cart-button'>Add to cart</button>
        }
        </div>
      )

}

export default AddToCart;