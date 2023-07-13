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
  };

  return (
    <Card style={{ width: "100%" }}>
      <CardActionArea>
        <CardContent style={{ display: "flex", gap: "1rem" }}>
          <Avatar src={cardData?.image} />
          <div>
            <Typography>
              {cardData?.name || ""}
              <span>${cardData.price}</span>
            </Typography>
            <Typography>{cardData?.description || ""}</Typography>
            <Typography>Quantity: {cardData?.quantity || ""}</Typography>
          </div>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
        {/* //todo */}
        <Button onClick={() => handleRemove(cardData?.id)}>REMOVE</Button>
      </CardActions>
    </Card>
  );
}

export default CartItem;
