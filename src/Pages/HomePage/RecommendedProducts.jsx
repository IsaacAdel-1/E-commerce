import { useEffect, useState } from "react";
import "../ShopPage/Shop.css";
// import { Card, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "./RecommendedProducts.css";
const RecommendedProducts = ({ products }) => {


    console.log(products);
    return (
        <>
            <div className="Recommended" id="Recommended">
                <div className="RecommendedHeader">
                    <h2>You May Also Like</h2>
                </div>
                <div className="featuredProducts showingProducts RecommendedProducts">
                    {products.length > 0
                        ? products.slice(0, 4).map((product) => {
                            return (
                                <Link
                                    className="featuredCard productCard"
                                    to={`/product/${product.id}`}
                                    onClick={()=>{
                                        scrollTo(0,0)
                                    }}
                                >
                                    
                                    </Link>
                            );
                        })
                        : "there is a problem here"}
                </div>
            </div>
        </>
    );
};

export default RecommendedProducts;
