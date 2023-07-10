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
  const { cardData } = props;
  console.log("cardData: ", cardData);
  return (
    <Card style={{ width: "100%" }}>
      <CardActionArea>
        <CardContent>
          {/* todo */}
          {/* todo  */}
          <img src={cardData?.products?.image} />
          <div>
            <Typography>
              {cardData?.products?.title || ""}
              <span>${cardData.price}</span>
            </Typography>
            <Typography>{cardData?.products?.description || ""}</Typography>
            <Typography>Quantity: {cardData?.quantity || ""}</Typography>
          </div>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button>REMOVE</Button>
      </CardActions>
    </Card>
  );
}

export default CartItem;
