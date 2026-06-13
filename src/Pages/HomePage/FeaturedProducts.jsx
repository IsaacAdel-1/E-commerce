import "./FeaturedProducts.css";
import { useEffect, useState } from "react";
import CARD from "../../components/Card/Card";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then((response) => response.json())
      .then((Resp) => {
        setProducts(Resp.products.slice(10, 14));
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
          {products.length > 2 ? products.map((product) => (
            <CARD key={product.id} product={product} />
          )) : "Error"}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
