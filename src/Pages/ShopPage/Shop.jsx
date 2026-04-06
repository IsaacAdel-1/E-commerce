import StarRatings from "react-star-ratings";
import "../HomePage/FeaturedProducts.css";
import "./Shop.css";
import { useEffect, useState } from "react";
import getDataFromAPI from '../../Services/api'
import formatCategoriesForAPI from "../../Utilities/FormatCategoriesForAPI";
import ScrollWindow from '../../Utilities/ScrollY'
const API = "https://fakestoreapi.com/products/categories";
const dummyAPI = "https://dummyjson.com/products";
const DummyAPIsWebsite = "https://dummyjson.com/docs/products"


import CARD from "../../components/Card/Card";


const Shop = ({query}) => {
  
  const [productsComing, setProducts] = useState([]);

  const [NoProducts , setNoProducts] = useState(productsComing.length);

  const [filters, setFilters] = useState({
    beauty: false,
    fragrances: false,
    furniture: false,
    groceries: false,
    home_decoration: false,
    kitchen_accessories: false,
    laptops: false,
    mens_shirts: false,
    mens_shoes: false,
    mens_watches: false,
    mobile_accessories: false,
    motorcycle: false,
    skin_care: false,
    smartphones: false,
    sports_accessories: false,
    sunglasses: false,
    tablets: false,
    tops: false,
  });


  useEffect(()=>{
      setNoProducts(productsComing.length);
   
  },[productsComing.length])

  const handleCheckboxChange = (categoryName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [categoryName]: !prevFilters[categoryName],
    }));
  };


  const [initial, setInitial] = useState(0);
  const [end, setEnd] = useState(16);



  


  useEffect(() => {
    try{
      const Active_Categories = formatCategoriesForAPI(filters)

      const fetchData = async ()=>{
      if (Active_Categories.length > 0 && query.length === 0 ) {
        setProducts([]);
        for(const element of Active_Categories) {
          
          const result = await getDataFromAPI("https://dummyjson.com/products/category" , element);
          if(result.status == "error"){
            throw new Error (result.value);
          }
          setProducts(prev => [...prev , ...result.value.products])
        }
      }
      else if(Array.isArray(query) && query.length > 0) {
        setProducts(query)
      }

      else if(query.length == 0 && Active_Categories.length === 0){
      
        const result = await getDataFromAPI("https://dummyjson.com/products");
        if(result.status == "error"){
          throw new Error (result.value);
        }
        setProducts(result.value.products)
      }
    }
    fetchData();
}catch(e){
  console.error(e)
}
  }, [filters  , query]);
  

  const handlePageNumber = (initial, end) => {
    setInitial(initial);
    setEnd(end);
  };
  return (
    <>
      <div className="shopContainer">
        <div className="shopHeader">
          <h2>Shopping</h2>
        </div>
        <div className="shopBody">
          <div className="filters">
            <div className="filterTitle">Filters</div>


            {/* Set Categories */}
            <div className="categories">
              <div className="categoryList"

              >
                <h3>Category</h3>
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.beauty}
                      onChange={() => { handleCheckboxChange('beauty'); }}
                    />
                    <span>beauty</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.fragrances}
                      onChange={() => { handleCheckboxChange('fragrances'); }}
                    />
                    <span>fragrances</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.furniture}
                      onChange={() => { handleCheckboxChange('furniture')  }}
                    />
                    <span>furniture</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.groceries}
                      onChange={() => { handleCheckboxChange('groceries')  }}
                    />
                    <span>groceries</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.home_decoration}
                      onChange={() => { handleCheckboxChange('home_decoration')  }}
                    />
                    <span>home decoration</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.kitchen_accessories}
                      onChange={() => { handleCheckboxChange('kitchen_accessories')  }}
                    />
                    <span>kitchen accessories</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.laptops}
                      onChange={() => { handleCheckboxChange('laptops')  }}
                    />
                    <span>laptops</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.mens_shirts}
                      onChange={() => { handleCheckboxChange('mens_shirts')  }}
                    />
                    <span>mens shirts</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.mens_shoes}
                      onChange={() => { handleCheckboxChange('mens_shoes')  }}
                    />
                    <span>mens shoes</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.mens_watches}
                      onChange={() => { handleCheckboxChange('mens_watches')  }}
                    />
                    <span>mens watches</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.mobile_accessories}
                      onChange={() => { handleCheckboxChange('mobile_accessories')  }}
                    />
                    <span>mobile accessories</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.motorcycle}
                      onChange={() => { handleCheckboxChange('motorcycle')  }}
                    />
                    <span>motorcycle</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.skin_care}
                      onChange={() => { handleCheckboxChange('skin_care')  }}
                    />
                    <span>skin care</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.smartphones}
                      onChange={() => { handleCheckboxChange('smartphones')  }}
                    />
                    <span>smartphones</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.sports_accessories}
                      onChange={() => { handleCheckboxChange('sports_accessories')  }}
                    />
                    <span>sports accessories</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.sunglasses}
                      onChange={() => { handleCheckboxChange('sunglasses')  }}
                    />
                    <span>sunglasses</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.tablets}
                      onChange={() => { handleCheckboxChange('tablets')  }}
                    />
                    <span>tablets</span>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={filters.tops}
                      onChange={() => { handleCheckboxChange('tops')  }}
                    />
                    <span>tops</span>
                  </li>
                </ul>
              </div>

              <div className="categoryList">
                <h3>Price Range</h3>
                <ul>
                  <li>
                    <input type="checkbox" />
                    <span>$0-$50</span>
                  </li>

                  <li>
                    <input type="checkbox" />
                    <span>$50-$100</span>
                  </li>

                  <li>
                    <input type="checkbox" />
                    <span>$100-$200</span>
                  </li>

                  <li>
                    <input type="checkbox" />
                    <span>$200-$500</span>
                  </li>
                </ul>
              </div>

              <div className="categoryList colorCate">
                <h3>Color</h3>

                <div className="colorsCircles">
                  <div className="balck color"></div>
                  <div className="white color"></div>
                  <div className="gray color"></div>
                  <div className="red color"></div>
                  <div className="blue color"></div>
                  <div className="green color"></div>
                </div>
              </div>

              <div className="categoryList">
                <h3>Size</h3>
                <div className="sizes">
                  <button className="XS size"> XS</button>
                  <button className="S size"> S</button>
                  <button className="M size"> M</button>
                  <button className="L size"> L</button>
                  <button className="XL size"> XL</button>
                </div>
              </div>

              <div className="categoryList">
                <h3>Rating</h3>
                <div className="ratingList">
                  <div className="rateOption">
                    <input type="checkbox" />
                    <div className="fiveStartOption">
                      <StarRatings
                        rating={5}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="2px"
                        name="rating"
                      />
                    </div>
                  </div>

                  <div className="rateOption">
                    <input type="checkbox" />
                    <div
                      className="fiveStartOption"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <StarRatings
                        rating={4}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="2px"
                        name="rating"
                      />
                      &up
                    </div>
                  </div>

                  <div className="rateOption">
                    <input type="checkbox" />
                    <div
                      className="fiveStartOption"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <StarRatings
                        rating={3}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="2px"
                        name="rating"
                      />{" "}
                      &up
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <button className="ApplyFilter" onClick={() => { handleFilter(); console.log("Clicked") }}>Apply Filter</button>
          </div>

          <div className="featuredProducts showingProducts ">
            {productsComing.length > 1 ? 
              

            <CARD products = {productsComing.slice(initial , end) } />
              
             : ""}
          </div>
        </div>
      </div>
      <div className="shopFooter ">
        
        <div className="PageNumberButtons ">
          <button
            className="pageNumber bg-blue-500 text-black rounded-lg"
            id="1"
            onClick={() => {
              handlePageNumber(0, 16);
              ScrollWindow()
            }}

            style={{display : NoProducts > 9 ? "block" : "none" }}
          >
            1
          </button>
          <button
            className="pageNumber bg-blue-500 text-black rounded-lg"
            id="2"
            onClick={() => {
              handlePageNumber(16, 31);
              ScrollWindow()
            }}
             style={{display : NoProducts > 9 ? "block" : "none" }}
          >
            2
          </button>
          
        </div>
      </div>
    </>
  );
};

export default Shop;
