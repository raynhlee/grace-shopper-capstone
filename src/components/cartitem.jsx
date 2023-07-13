import React from "react";
import { fetchFromAPI } from "../api";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

function CartItem(props) {
  const { cardData, onDelete } = props;

  console.log("cardData: ", cardData);

  const handleRemove = async () => {
    const data = await fetchFromAPI({
      path: `/orders/${cardData.id}`,
      method: "delete",
    });
    console.log("data: ", data);
    console.log("cardDataId: ", cardData.id);

    onDelete();

    // Promise.all([
    //   fetchFromAPI({ path: "/orders", method: "update", body: {} }),
    // ]);
  };

  return (
    <Card style={{ boxShadow: 'none' }} id='cart-item-card'>
      <CardActionArea>
        <div style={{ display: "flex", gap: "1rem" }} id='cart-item-container'>
          <div id='cart-item-pic-name-delete'>
          <Avatar src={cardData?.image} id='cart-item-image'/>
          <div id='cart-item-name-delete-button'>
          <div>
            <Typography id='cart-item-name'>
              {cardData?.name || ""}
             
            </Typography>
            </div>
            <div id='delete-cart-item-div'>
            <button id='add-to-cart-button' onClick={() => handleRemove(cardData?.id)}>Delete</button>
            </div>
            </div>
          
          </div>
          <p id='card-item-price'>${cardData.price}</p>
        </div>
      </CardActionArea>

    </Card>
  );
}

export default CartItem;
