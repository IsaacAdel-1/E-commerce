

import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import './Card.css';
import { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';
import { addProduct_ToCart } from '../../Services/constants'


import { toast } from 'react-toastify';

const CARD = ({ product }) => {

    const { Add } = useContext(CartContext);
    const [isAdded , setIsAdded] = useState(false);
    const handleAddToCart = (clickedProduct) => {
    toast.success(`${product.title} has been added to the cart 🛒`, {
      theme: "colored"
    });
        try {


            const newProduct = {
                title: clickedProduct.title,
                ID: clickedProduct.id,
                image: clickedProduct.thumbnail,
                price: clickedProduct.price,
                rate: clickedProduct.rating
            }

            fetch(addProduct_ToCart, {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: 'include'
            }).then(response => {
                if (!response.ok) { throw new Error("Network Response was not ok"); }
                return response.json()
            })
        }
        catch (e) { console.error("Error : " + e.message) }
  
    }

    return (
        <>

            
         <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:border-blue-200 w-full max-w-[18rem] h-[442px]">
        
                {/* 1. Image Section with Hover Effect & Badge */}

                <div className="relative overflow-hidden bg-gray-50 h-56">

                    {product.discountPercentage > 0 && (

                        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">

                            {Math.round(product.discountPercentage)}% OFF

                        </span>

                    )}

                    <Link to={`/product/${product.id}`} className="block h-full">

                        <img

                            src={product.images[0]}

                            alt={product.title}

                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"

                            loading="lazy"

                        />

                    </Link>

                </div>



                {/* 2. Content Section */}

                <div className="flex flex-1 flex-col p-4">

                    <Link to={`/product/${product.id}`} className="block">

                        <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors h-10 overflow-hidden line-clamp-2">

                            {product.title}

                        </h3>

                    </Link>



                    <div className="mt-2 flex items-center justify-between">

                        <StarRatings

                            rating={product.rating}

                            starRatedColor="#FBBF24"

                            numberOfStars={5}

                            starDimension="14px"

                            starSpacing="1px"

                        />

                        <span className="text-[10px] text-gray-400 font-medium">

                            ({product.availabilityStatus || 'In Stock'})

                        </span>

                    </div>



                    {/* 3. Price & Add Button */}

                    <div className="mt-4 flex items-center justify-between">

                        <span className="text-lg font-bold text-gray-900">${product.price}</span>

                        <button

                            onClick={() => {handleAddToCart(product); Add(product)}}

                            className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900
                               text-white transition-all hover:bg-blue-600 active:scale-90 shadow-md cursor-pointer`}

                        >

                            <span className={` text-xl font-light `}>+ </span>

                        </button>

                    </div>

                </div>

            </div>


        </>
    )
}
export default CARD;