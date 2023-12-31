import React from "react";
import { fetchFromAPI } from "../api";
import Swal from "sweetalert2";

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
            Swal.fire({
              icon: 'success',
              iconColor: '#cc0000',
              title: 'Item added to cart',
              showConfirmButton: false,
              timer: 2000
            });
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
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'You must be signed in to add items to your cart.'
                });
                return;
              }
              addToCart(product);
            }}
            id='single-product-add-to-cart'>Add to cart</button>
          : <button onClick={() => {
            if(!token){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must be signed in to add items to your cart.'
              });
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
