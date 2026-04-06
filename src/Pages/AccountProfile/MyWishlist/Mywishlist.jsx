// import { Card, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import './Mywishlist.css'
// import CARD from "../../../components/Card/Card";
import { useState } from "react";

const Mywishlist = () => {
    const products = [
        {
            id: 1,
            title: "iPhone 14 Pro Max",
            images: [
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
            ],
            rating: 4.8,
            discountPercentage: 10,
            price: 1200
        },
        {
            id: 2,
            title: "Samsung Galaxy S23",
            images: [
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
            ],
            rating: 4.6,
            discountPercentage: 15,
            price: 950
        },
        {
            id: 3,
            title: "MacBook Pro 16",
            images: [
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2t8ZW58MHx8MHx8fDA%3D"
            ],
            rating: 4.9,
            discountPercentage: 5,
            price: 2400
        }
        ];
    const [sendingProducts , setSendingProducts]=useState(products);



const ClearALL = ()=>{
    setSendingProducts([]);
    console.log(sendingProducts);
}
    return (
        <>
            <div className="MywishlistContainer">
                <header>
                    <h3>My Wishlist</h3>
                    <a className="ClearAllBtn"
                        onClick={()=>{ClearALL();}}
                    >Clear All</a>
                </header>

                <div className="wishingOrdersCards">
                  {/* <CARD products={sendingProducts} /> */}

                </div>
            </div>
        </>
    )
}

export default Mywishlist ;