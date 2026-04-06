import { useEffect, useState } from "react";
import "../ShopPage/Shop.css";
// import { Card, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import "./RecommendedProducts.css";
const RecommendedProducts = ({ products }) => {
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     console.log("Category:", category);

    //     fetch(`https://dummyjson.com/products/category/${category}`)
    //         .then(res => res.json())
    //         .then(res => {console.log(res); setProducts(res.products)});
    // }, [])

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
                                    {/* <Card className="featuredCard productCard" key={product.id}>

                                        <div className="featuredCardHeader">
                                            <img src={product.images[0]} alt="" />
                                        </div>
                                        <Card.Body className="featuredCardText">
                                            <Card.Title className="featuredCardTitle">
                                                {product.title.length > 25
                                                    ? product.title.slice(0, 24) + "..."
                                                    : product.title}
                                            </Card.Title>
                                            <div className="featuredCardProduct">
                                                <div className="productRating">
                                                    <StarRatings
                                                        rating={product.rating}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        starDimension="20px"
                                                        starSpacing="2px"
                                                        name="rating"
                                                    />
                                                    <span className="productCountRating">
                                                        {" disc:   " + product.discountPercentage + "%"}
                                                    </span>
                                                </div>
                                                <div className="LastSectionOfCard">
                                                    <div className="productPrice">
                                                        {"$" + product.price}
                                                    </div>
                                                    <button className="AddCartSign">+</button>
                                                </div>
                                            </div>
                                        </Card.Body>

                                    </Card>  */}
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
