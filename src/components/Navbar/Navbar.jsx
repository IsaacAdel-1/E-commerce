
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import CartContext from "../../context/CartContext";
import { HashLink } from "react-router-hash-link";
import useProductSearch from "../../Hooks/useProductSearch";
import {IMAGES_URL} from '../../Services/constants'
const Navbar = ({ query }) => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext)
   
    const [search, setSearch] = useState("");
    const {state} = useContext(CartContext); 

    console.log(user);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

  useProductSearch(search , query)
    return (
        <>
            <div className="main-nav">
                <div className="logo">
                    <Link to={'/'} className="LogoLink">
                        Modern<span>Shop</span>
                    </Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <HashLink  to="#categories">Categories</HashLink>
                    </li>
                    <li>
                        <HashLink to="#featured">Featured</HashLink>
                    </li>
                </ul>
                <div className="searchAndCart">
                    <div className="search">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Search products"
                            value={search}
                            // value علشان لو اليوزر داس علي خيار معين مثلاً ممكن اخلي اللي مكتوب في الانبوت نفس اللي داس عليه من غير ما يكتب
                            // onKeyDown={(event)=>handleKeyDown(event)}
                            onChange={(e) => {
                                handleSearch(e);
                            }}
                        />
                        <div className="searchIcon">
                            <FaSearch />
                        </div>
                      
                    </div>

                              <div className="shoppingCart">
                           <Link to={'/profile/my-orders'}><MdOutlineShoppingCart size={24} className="ShoppingCart">
                                
                            </MdOutlineShoppingCart></Link>
                            <span className="numberOfcarts">{state.length}</span>
                        </div>
                    <div className="Register">
                        { user.name ? <Link  to ={'/profile'} className="fs-5 text-decoration-none text-dark">{user.name}</Link> :
                        <Link to={'/login'} className="LogninButton">Log In</Link>}
                        {user.name ? <img src={`${IMAGES_URL}${user.image}`} alt="" className="userImage" onClick={()=>{navigate('/profile')}} /> :
                        <Link className="signUPButton" to={'/signup'}>Sign Up</Link>}
                        {user.name ? "" :""}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
