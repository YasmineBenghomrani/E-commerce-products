import { CircularProgress, Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ProductPage() {
  const { id } = useParams();
  const [produit, setProduit] = useState();
  const [loading, setLoading] = useState(true);
  const [displayImage, setDisplayImage] = useState("");
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/" + id)
      .then((res) => {
        console.log(res.data);
        setProduit(res.data);
        setDisplayImage(res.data.thumbnail);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="p">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="product-content">
            <div className="left">
              <div className="images">
                {produit.images.map((url) => {
                  return (
                    <img
                      style={
                        url === displayImage
                          ? { border: "1px solid black" }
                          : null
                      }
                      onClick={() => {
                        setDisplayImage(url);
                      }}
                      key={url}
                      src={url}
                      alt=""
                    />
                  );
                })}
              </div>
              <div className="image">
                <img src={displayImage} alt="" />
              </div>
            </div>
            <div className="line"></div>
            <div className="right">
              <h2>{produit.title}</h2>
              <div className="description">
                {" "}
                <h4>Summary</h4>
                <p className="title">{produit.description}</p>
              </div>
              <div className="prix">
                <h4>Price</h4>
                <p className="price">{produit.price}$</p>
              </div>
              <div className="brand">
                <h4>Brand</h4>
                <p className="rating">{produit.brand}</p>
              </div>
              <div className="rating">
                <h4>rating</h4>
                <Rating name="read-only" value={produit.rating} readOnly />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
