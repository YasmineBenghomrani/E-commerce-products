import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchAppBar from "./components/appBar";
import MediaCard from "./components/card";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [selectedCateg, setSelectedCateg] = useState("Smartphones");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [panier, setPanier] = useState([]);
  const [cartModal, setCartModal] = useState(false);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        console.log(res.data.products);
        setProduct(res.data.products);
        setAllProducts(res.data.products);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <SearchAppBar allProducts={allProducts} setProduct={setProduct} />
      <section className="product">
        <h2>Products</h2>
        <div className="action">
          <input
            onClick={() => {
              setSelectedCateg("All");
              setProduct(allProducts);
            }}
            style={
              selectedCateg == "All"
                ? {
                    backgroundColor: "cornflowerblue",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="All"
          />
          <input
            onClick={() => {
              setSelectedCateg("Smartphones");
              setProduct(
                allProducts.filter((e) => e.category === "smartphones")
              );
            }}
            style={
              selectedCateg == "Smartphones"
                ? {
                    backgroundColor: "cornflowerblue",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="Smartphones"
          />
          <input
            onClick={() => {
              setSelectedCateg("Home decoration");
              setProduct(
                allProducts.filter((e) => e.category === "home-decoration")
              );
            }}
            style={
              selectedCateg == "Home decoration"
                ? {
                    backgroundColor: "cornflowerblue",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="Home decoration"
          />
          <input
            onClick={() => {
              setSelectedCateg("Groceries");
              setProduct(allProducts.filter((e) => e.category === "groceries"));
            }}
            style={
              selectedCateg == "Groceries"
                ? {
                    backgroundColor: "cornflowerblue",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="Groceries"
          />
        </div>
        <div className="productCountent">
          {loading ? (
            <CircularProgress />
          ) : (
            product.map((e) => {
              return (
                <MediaCard
                  key={e.id}
                  titre={e.title}
                  image={e.thumbnail}
                  description={e.description}
                  price={e.price}
                  discount={e.discountPercentage}
                  id={e.id}
                  setPanier={setPanier}
                />
              );
            })
          )}
        </div>
      </section>
      <div
        onClick={() => {
          setCartModal(!cartModal);
        }}
        class="cart-button"
      >
        <ShoppingBasketIcon />
      </div>
      {cartModal && (
        <div class="cart-modal">
          {panier.map((e, i) => {
            return (
              <div className="addproduct">
                <h2>{e.titre}</h2>
                <div class="quantity">
                  <input
                    onClick={() => {
                      console.log("clicked");
                      let temp = panier;
                      temp[i].quantity++;
                      setPanier([...temp]);
                    }}
                    type="button"
                    value="+"
                  />
                  <p>{e.quantity} </p>
                  <input
                    onClick={() => {
                      let temp = panier;
                      if (temp[i].quantity > 1) {
                        temp[i].quantity--;
                      } else {
                        toast("non");
                      }
                      setPanier([...temp]);
                    }}
                    type="button"
                    value="-"
                  />
                </div>
                <h3>{e.price * e.quantity}</h3>
                <div className="total">
                  <h2>total</h2>
                  <h3>
                    {panier.reduce(
                      (acc, current) => acc + current.price * current.quantity,
                      0
                    )}{" "}
                    $
                  </h3>
                </div>
                <input
                  onClick={() => {
                    setPanier(panier.filter((p) => p.titre !== e.titre));
                  }}
                  className="Delet"
                  type="button"
                  value="Delet"
                />
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </main>
  );
}

export default App;
