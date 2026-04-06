import { FaPinterest, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';  
import { Link } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Footer = () => {
    const Scroll=()=>{
        window.scrollY()
    }
    const {user} = useContext(UserContext)
    return (
       
            <footer className="Footer">
                <div className="ModernShop">
                    <h3>ModernShop</h3>
                    <div>

                        <p>Your one-stop destination for modern, high-quality products at affordable prices.</p>

                       
                        <div className='SocialMediaIcons'>
                            <a href="https://www.facebook.com/ashq.nywtn">
                                <FaFacebook />
                            </a>
                            <a href="https://www.instagram.com/isaac120q/">
                                <FaInstagram />
                            </a>
                            <a href="https://www.pinterest.com/">
                                <FaPinterest />
                            </a>
                            <a href="https://www.linkedin.com/mynetwork/grow/">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>


                </div>


                <div className="QuickLinks">
                    <h3 className='text-[#748299]'>Quick Links</h3>
                    <ul className='flex flex-col website-links'>
                        <Link to={'/'} className='no-underline text-[#748299]'>Home</Link>
                        <Link to={'/Shop'}>Shop</Link>
                        <HashLink to='#join-our'>Join Us</HashLink>
                        <Link to={'/contact-us'}>Contact</Link>
                        <Link>FAQ</Link>
                    </ul>
                </div>


                <div className="CustomerService">
                    <h3>Customer Services</h3>
                    <ul>
                        <Link to={ user ?'/profile':"/login"}>My Account</Link>
                        <li>Orders & Returns</li>
                        <li>Shipping Policy</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>


                </div>

                <div className="Newsletter">
                    <h3>Newsletter</h3>
                    <p>Subscribe to receive updates, access to exclusive deals, and more.</p>

                    <div className="FooterEnterEmail">
                        <input type="email" placeholder="Enter your email" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </footer>
        
    );
};

export default Footer;