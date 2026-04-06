// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import "./ShopByCateg.css";
// import { FiChevronLeft } from "react-icons/fi";
import {
  Sparkles, Flower, Sofa, ShoppingCart, Home, Utensils, Laptop,
  Shirt, Footprints, Watch, Smartphone, Bike, Scissors,
  Dumbbell, Sun, Tablet, User, Car, ShoppingBag, Gem, Palette
} from 'lucide-react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { use, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
const ShopByCateg = () => {
  const CategoriesRef = useRef(null);
  const [Category, setCategory] = useState([]);
  const categoryIcons = {
    'beauty': <Sparkles />,
    'fragrances': <Flower />,
    'furniture': <Sofa />,
    'groceries': <ShoppingCart />,
    'home-decoration': <Home />,
    'kitchen-accessories': <Utensils />,
    'laptops': <Laptop />,
    'mens-shirts': <Shirt />,
    'mens-shoes': <Footprints />,
    'mens-watches': <Watch />,
    'mobile-accessories': <Smartphone />,
    'motorcycle': <Bike />,
    'skin-care': <Scissors />,
    'smartphones': <Smartphone />,
    'sports-accessories': <Dumbbell />,
    'sunglasses': <Sun />,
    'tablets': <Tablet />,
    'tops': <User />,
    'vehicle': <Car />,
    'womens-bags': <ShoppingBag />,
    'womens-dresses': <ShoppingBag />, // غيرنا دي عشان متهنجش
    'womens-jewellery': <Gem />,
    'womens-shoes': <Footprints />,   // ودي كمان
    'womens-watches': <Watch />,
  };
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategory(res.slice(0, 12));
      });
  }, []);

  const [End, setEnd] = useState(4);
  return (
    <>
      <div className="shopCategContainer" ref={CategoriesRef} id="categories">
        <div className="shopCategText">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <p className="text-xl ">Browse our most popular categories</p>
        </div>

        <div className="categoriesSection">
          {Category.slice(0, End).map((card) => {
            const slug = card.slug;
            return (
              <Link key={card.slug} className="CardLinkTag no-underline ">
                <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-600 w-[17rem]">

                  {/* Header Section (Icon) */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex w-16 h-16 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <span className="h-6 w-[18rem] flex items-center justify-center ">
                        {/* استدعاء الأيقونة مع تمرير حجم 32 أو 36 حسب رغبتك */}
                          {React.cloneElement(categoryIcons[card.slug] || <Sparkles />, { 
                            size: 75, 
                            strokeWidth: 1.5 // الخط بيبقى أرق وأشيك لما نكبر الأيقونة
                          })}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {card.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="expandButtonCategory">
          <button
            className="ArrowDown"
            onClick={() => {
              if (End === 4) {
                setEnd(12);

                return;
              }
              if (End === 12) {
                setEnd(4);
                window.scrollTo({
                  top: CategoriesRef.current.offsetTop,
                  behavior: "smooth",
                });
                return;
              }
            }}
          >
            {End === 4 ? <FiChevronDown /> : <FiChevronUp />}
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopByCateg;
