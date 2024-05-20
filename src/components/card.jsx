import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function MediaCard({
  titre,
  description,
  image,
  price,
  discount,
  id,
  setPanier,
}) {
  const discountprice = price - (price * discount) / 100;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {titre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p className="line-through">{price}$</p>
          <p>{discountprice.toFixed(2)}$</p>
        </Typography>
        <div className="discount">{discount}%</div>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setPanier((encienpanier) => {
              let existingProduct = encienpanier.filter(
                (e) => e.titre === titre
              );
              if (existingProduct.length === 0) {
                return [...encienpanier, { titre, price, quantity: 1 }];
              } else {
                toast("Ce produit existe deja dans le panier");
                return [...encienpanier];
              }
            });
          }}
          size="small"
        >
          Add to card
        </Button>
        <Link to={"productPage/" + id}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
