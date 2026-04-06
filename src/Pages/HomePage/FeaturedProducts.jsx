// import { Card, Button } from "react-bootstrap";
import "./FeaturedProducts.css";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const API = "https://fakestoreapi.com";
// const Routes =[
//     products = "/products",
//     page = "/product/1",
//     categories = "/products/categories",

// ]

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
        <div className="featuredText">
          <h2 className="text-2xl font-bold tracking-wider">Featured Products</h2>
          <p className="mt-2 text-2xl">Handpicked by our experts</p>
        </div>

        <div className="featuredProducts showingProducts">
          {products.length > 2 ? products.map((product) => {
            return (
              <>
                <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm transition-all hover:shadow-lg hover:border-blue-300 w-[19rem]">

                  {/* Image Section */}
                  <div className="overflow-hidden bg-blue-50/50">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col p-4">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                      {product.title.length > 25
                        ? product.title.slice(0, 24) + "..."
                        : product.title}
                    </h3>

                    {/* Rating & Availability */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center text-yellow-400">
                        <span className="text-xs font-medium text-blue-900">
                          ⭐ {product.rating}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-400 uppercase tracking-wider font-medium">
                        ({product.availabilityStatus})
                      </span>
                    </div>

                    {/* Price & Add Button */}
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>

                      {/* Blue Button matching your site style */}
                      <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 shadow-sm">
                        <span className="text-2xl font-light leading-none">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>

            );
          }) : "Error"}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
