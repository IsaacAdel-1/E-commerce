import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import RecommendedProducts from "../HomePage/RecommendedProducts";
// import { FaLeaf } from "react-icons/fa";


const SingleProduct = () => {

    const { id } = useParams()
    const [color, setColor] = useState("Silver");
    const [size, setSize] = useState("36");
    const [NumOfProducts, setNumOfProducts] = useState(1);
    const [product, setProduct] = useState({});

    //Recommended
     const [products, setProducts] = useState([]);

    //End Recommended

    // page functions 
    const handleColor = (sendingColor) => {
        setColor(sendingColor);

    };

    const handlePlus = () => {

        setNumOfProducts(prev => ++prev)
    }
    const handleMinus = () => {
        if (NumOfProducts > 1) {
            setNumOfProducts(prev => --prev)
        }
    }
    const handleSize = (size) => {
        setSize(size);
    };

    //End of Page Funtcions 


    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(res => { 
                console.log(res.category); setProduct(res)
                return fetch(`https://dummyjson.com/products/category/${res.category}`)
            })
            .then(res => res.json())
            .then(res => setProducts(res.products))

    }, [id])

    // Recommended Products
    //  useEffect(() => {
    //      if (!product.category) return;
    //     console.log("Category:", product.category);

    //     fetch(`https://dummyjson.com/products/category/${product.category}`)
    //         .then(res => res.json())
    //         .then(res => {console.log(res); setProducts(res.products)});
    // }, [product.category])
    return (
        <>
            <div className="singleProductPage">
                <div className="singleProductHeader">
                    <h2>Home / Products / {product.title}</h2>
                </div>
                <div className="productBody">
                    <div className="productImage">
                        <img src={product.images ? product.images[0]?product.images[0]: product.images: "" } alt="Product Image" />
                        <div className="colorsOfProduct">
                            <div className="gray">
                                <div className="colorCircle"></div>
                            </div>

                            <div className="grayB">
                                <div className="colorCircle"></div>
                            </div>

                            <div className="grayBr">
                                <div className="colorCircle"></div>
                            </div>

                            <div className="grayBlack">
                                <div className="colorCircle"></div>
                            </div>
                        </div>
                    </div>

                    <div className="detailsOfProduct">
                        <h2>{product.title}</h2>

                        <div className="rate">
                            <StarRatings
                                rating={product.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                                name="rating"
                            />
                            <p>{"(" + product.rating + ")"}</p>
                        </div>

                        <div className="price">

                            <p>{product.price}</p>
                            <span>{"20"}</span>
                            <span>{"Save " + product.discountPercentage + "%"}</span>


                        </div>

                        <div className="description">
                            <p>{product.description}</p>
                        </div>

                        <div className="productColors">
                            <div className="colorType">Color : {color}</div>

                            <div className="colorsContainer">
                                <div
                                    className="silver ProdColor"
                                    onClick={(e) => {
                                        handleColor("Silver");

                                    }}
                                    style={{ border: color == "Silver" ? "1px solid #312e81 " : "" }}
                                ></div>
                                <div
                                    className="darkOrange ProdColor"
                                    onClick={() => {
                                        handleColor("Dark Orange");
                                    }}
                                    style={{ border: color == "Dark Orange" ? "1px solid #312e81" : "" }}
                                ></div>
                                <div
                                    className="black ProdColor"
                                    onClick={() => {
                                        handleColor("Black");
                                    }}
                                    style={{ border: color == "Black" ? "2px solid #000" : "" }}
                                ></div>
                                <div
                                    className="Indigo ProdColor"
                                    onClick={() => {
                                        handleColor("Indigo");
                                    }}
                                    style={{ border: color == "Indigo" ? "1px solid #312e81" : "" }}
                                ></div>
                            </div>
                        </div>

                        <div className="size">
                            <h3>Size : {size}</h3>
                            <div className="sizes d-flex">
                                <div
                                    className="36 numOfSize"
                                    onClick={() => {
                                        handleSize(36);

                                    }}
                                    style={{ color: size == 36 ? "#6366f1" : "", fontSize: size == 36 ? "1.65rem" : "" }}

                                >
                                    36
                                </div>
                                <div
                                    className="40 numOfSize"
                                    onClick={() => {
                                        handleSize(40);
                                    }}
                                    style={{ color: size == 40 ? "#6366f1" : "", fontSize: size == 40 ? "1.65rem" : "" }}
                                >
                                    40
                                </div>
                                <div
                                    className="44 numOfSize"
                                    onClick={() => {
                                        handleSize(44);
                                    }}
                                    style={{ color: size == 44 ? "#6366f1" : "", fontSize: size == 44 ? "1.65rem" : "" }}
                                >
                                    44
                                </div>
                            </div>
                        </div>

                        <div className="Quantity">
                            <h3>Quantity</h3>

                            <div className="NumOf">
                                <button onClick={() => { handleMinus() }}>-</button>
                                <span className="showingNum">{NumOfProducts}</span>
                                <button onClick={() => { handlePlus() }}>+</button>
                            </div>

                            <div className="buying">
                                <button className="AddToCart buyButton"><span><MdOutlineShoppingCart /></span>Add to cart</button>
                                <button className="BuyNow buyButton">Buy now</button>
                            </div>
                        </div>

                        <div className="product_Details">
                            <p>Product Details</p>

                            <ul class="product-details">
                                {product.reviews && product.reviews.map((review) => {
                                    return (
                                        <li>
                                            <div className="reviewContainer">
                                                <div className="reviewHead">
                                                    <p className="reviewerName">{review.reviewerName}</p>
                                                    <p className="reviewerEmail">{review.reviewerEmail}</p>
                                                </div>

                                                <div className="reviewStars">
                                                    <StarRatings
                                                        rating={review.rating}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        starDimension="20px"
                                                        starSpacing="2px"
                                                        name="rating"
                                                    />
                                                    ({review.rating})
                                                </div>

                                                <div className="reviewComment">
                                                    {review.comment}
                                                </div>
                                            </div>
                                        </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/*Recommended Section  */}
                                {products.length > 1  ? <RecommendedProducts products = {products}/>:"Recommended Products" }
         
        </>
    );
};

export default SingleProduct;
