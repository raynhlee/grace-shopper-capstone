import React from "react";
import { fetchFromAPI } from "../api";

function CartItem(props) {
  const { cardData, onDelete } = props;

 

  const handleRemove = async () => {
      await fetchFromAPI({
      path: `/orders/${cardData.id}`,
      method: "delete",
    });
   

    onDelete();
  };

  return (
    <div style={{ boxShadow: 'none' }} id='cart-item-card'>
      <div>
        <div style={{ display: "flex", gap: "1rem" }} id='cart-item-container'>
          <div id='cart-item-pic-name-delete'>
          <img src={cardData?.image} id='cart-item-image'/>
          <div id='cart-item-name-delete-button'>
          <div>
            <div id='cart-item-name'>
              {cardData?.name || ""}
             
            </div>
            </div>
            <div id='delete-cart-item-div'>
            <button id='add-to-cart-button' onClick={() => handleRemove(cardData?.id)}>Delete</button>
            </div>
            </div>
          
          </div>
          <p id='card-item-price'>${cardData.price}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
