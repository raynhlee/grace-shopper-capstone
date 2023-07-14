import React from "react";
import { fetchFromAPI } from "../api";
import swal from "sweetalert";

const AddToCart = ({product, count, setCount, setProducts, user, onSingleProductPage, token}) => {

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
         
          if(order){
            alert('Item added to cart! :) ')
          }

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
            ? <button onClick={() => {
              if(!token){
                alert('You must be signed in to add items to your cart.')
                return;
              }
              addToCart(product)
            }}
            id='single-product-add-to-cart'>Add to cart</button>
          : <button onClick={() => {
            if(!token){
              alert('You must be signed in to add items to your cart.')
              return;
            }
            addToCart(product)
          }}
                    id='add-to-cart-button'>Add to cart</button>
        }
        </div>
      )

}

export default AddToCart;
