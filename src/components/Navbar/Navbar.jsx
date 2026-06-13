
import "./Navbar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
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
    const [menuOpen, setMenuOpen] = useState(false);
    const {state} = useContext(CartContext);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const closeMenu = () => setMenuOpen(false);

  useProductSearch(search , query)
    return (
        <>
            <div className="main-nav">
                <button
                    className="menuToggle"
                    aria-label="Toggle menu"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
                <div className="logo">
                    <Link to={'/'} className="LogoLink">
                        Modern<span>Shop</span>
                    </Link>
                </div>
                <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={closeMenu}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <HashLink  to="/#categories">Categories</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#featured">Featured</HashLink>
                    </li>
                     <li>
                        <Link to="/profile">profile page</Link>
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
                            <span key={state.length} className="badge-animate numberOfcarts">{state.length}</span>
                        </div>
                    <div className="Register">
                        { user.name ? <Link  to ={'/profile'} className="fs-5 text-decoration-none text-dark">{user.name}</Link> :
                        <Link to={'/login'} className="LogninButton">Log In</Link>}
                            {user.name ? <img src={`${IMAGES_URL}/${user.image}`} alt="Profile" className="userImage" onClick={()=>{navigate('/profile')}} onError={(e) => e.target.src = 'default-avatar.png'}/> :
                        <Link className="signUPButton" to={'/signup'}>Sign Up</Link>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
