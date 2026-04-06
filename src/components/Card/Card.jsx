

import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import './Card.css';
import { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';
import {addProduct_ToCart} from '../../Services/constants'
const CARD = ({ products }) => {
    
    const { Add } = useContext(CartContext);

    const addProductToCart = (clickedProduct) => {
        try {


            const newProduct = {
                title: clickedProduct.title,
                ID: clickedProduct.id,
                image: clickedProduct.thumbnail,
                price: clickedProduct.price,
                rate: clickedProduct.rating
            }

            fetch(addProduct_ToCart , {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: 'include'
            }).then(response => {
                if (!response.ok) { throw new Error("Network Response was not ok"); }
                return response.json()
            }

            ).then(data => {
                console.log(data);
                alert(data.message)
            })



        }
        catch (e) { console.log("Error : " + e.message) }
    }

    return (
        <>
            <div className="container flex  gap-5 p-5 flex-wrap justify-start">
                {

                    products.map((product) => {

                        return (
                            <>
                                <div className="group  border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-[14rem] " key={product.id}>
                                    {/* 1. حاوية الصورة */}
                                    <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-50">
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-full h-56 object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </Link>

                                    {/* 2. محتوى الكارت */}
                                    <div className="px-2">
                                        {/* العنوان */}
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="block text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2 h-10 overflow-hidden"
                                        >
                                            {product.title.length > 25 ? product.title.slice(0, 24) + "..." : product.title}
                                        </Link>


                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <StarRatings
                                                    rating={product.rating}
                                                    starRatedColor="#FBBF24" 
                                                    numberOfStars={5}
                                                    starDimension="16px"
                                                    starSpacing="1px"
                                                    name="rating"
                                                />
                                            </div>
                                            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full">
                                                {product.discountPercentage}% OFF
                                            </span>
                                        </div>

                                        {/* السعر وزرار الإضافة */}
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-lg font-bold text-gray-900">
                                                ${product.price}
                                            </div>
                                            <button
                                                onClick={() => { addProductToCart(product); Add(product); }}
                                                className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm active:scale-95"
                                            >
                                                <span className="text-xl font-light">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                          
             


                        )
                    })

                }</div></>)
}
export default CARD;