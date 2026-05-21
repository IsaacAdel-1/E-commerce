// import { Card, Button } from "react-bootstrap";
import "./FeaturedProducts.css";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import CARD from "../../components/Card/Card";

const API = "https://fakestoreapi.com";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then((response) => response.json())
      .then((Resp) => {
        setProducts(Resp.products.slice(10, 14));
        // console.log(Resp);
      });
  }, []);
  return (
    <>
      <div className="featuredContainer" id="featured">
        <div className="featured-header">
          <h2 className="text-2xl font-bold tracking-wider">Featured Products</h2>
          <p className="mt-2 text-2xl">Handpicked by our experts</p>
        </div>

        <div className="featuredProducts showingProducts">
          {products.length > 2 ? products.map((product) => {
            return (
              <>
        

                <CARD product={product}/>
              </>

            );
          }) : "Error"}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
