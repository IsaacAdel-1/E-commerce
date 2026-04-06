import style from "./AccountProfile.module.css";


import { FaCheckCircle , FaChartBar  , FaRegHeart , FaSignOutAlt  } from "react-icons/fa";
import { MdOutlineShoppingBag , MdOutlineLocationOn, MdOutlineAccountBalanceWallet ,MdOutlinePerson} from "react-icons/md";
import { BiShieldAlt2 , BiBell  } from "react-icons/bi";
import { useContext, useState } from "react";

import { NavLink , Outlet} from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {IMAGES_URL} from '../../Services/constants';
const url = "https://www.canva.com/ai/code/thread/71507b40-d862-4984-bdac-9eea6e186924";

const AccountProfile = () => {
    const [activeItem, setActiveItem] = useState("Dashboard")
  const person =  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#4f46e5" strokeWidth=".6" >
                    <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7  2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.9V22h19.2v-2.7c0-3.3-6.4-4.9-9.6-4.9z"/>
                  </svg>
  const camera = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"  fill="none"  strokeWidth="2" strokeLinecap="round"
                   strokeLinejoin="round"
                   className={style.cameraImageSVG}
                 >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
  
  const { user  , logout }=useContext(UserContext)

  const handleItemClick = (e)=>{
    setActiveItem(e);
  }
 
  return (
    <>
      <nav>
        <h4>Home / My Account</h4>
      </nav>

      <div className={style.Account_container}>

        <div className={style.account_card}>
            {/* Start Image and Data  */}
          <div className={style.account_data}>
            <div className={style.personImage}>
              {user.image ? (
                <img src={`${IMAGES_URL}${user.image}`} alt=""  className={style.userImage}/>
              ) : (
                // SVG Person Start
               person
                // SVG Person End
              )}
              {/* Start Camera SVG */}
              <div className={style.cameraImage}>
                {camera}
              </div>
              {/* End Camera SVG */}
            </div>
            <div className={style.dataText}>
              <p className={style.userName}>{user.name}</p>
              <p className={style.Email}>{user.email}</p>
              <p className={style.verified}>
                <FaCheckCircle className={style.FaCheckCircle} /> Verified
              </p>
            </div>
          </div>
            {/* End Image And Data */}

            <div className={style.Line}></div>
            
            <nav className={style.dashboard_menu}>
                
                    <NavLink to={'/profile'} end className={`${activeItem === 'Dashboard' ? style.active : ''} ${style.sidebarMenu}`}  onClick={()=>{handleItemClick("Dashboard")}}>
                      <FaChartBar  className={style.menuIcon}/> DashBoard
                    </NavLink>
               

             
                  <NavLink className={`${activeItem === 'MyOrders' ? style.active : ''} ${style.sidebarMenu}`} onClick={()=>{handleItemClick("MyOrders")}} to={'my-orders'}>
                    <MdOutlineShoppingBag className={style.menuIcon}/> My Orders
                  </NavLink>
              
                  <NavLink className={`${activeItem === 'Wishlist' ? style.active  : ''} ${style.sidebarMenu}`} onClick={()=>{handleItemClick('Wishlist')}} to={'wishList'}>
                    <FaRegHeart  className={style.menuIcon} /> Wishlist
                  </NavLink>
          
                  <NavLink className={`${activeItem === 'Address' ? style.active  : ''} ${style.sidebarMenu}`} onClick={()=>{handleItemClick("Address")}} to={'Address'}>
                    <MdOutlineLocationOn  className={style.menuIcon}/>Address
                  </NavLink>
                
                  <NavLink className={`${activeItem === 'PaymentMethods' ? style.active :' '} ${style.sidebarMenu}`} onClick={()=>{handleItemClick("PaymentMethods")}} to={'payment'}>
                    <MdOutlineAccountBalanceWallet   className={style.menuIcon}/> Payment Methods
                  </NavLink>
              
                  <NavLink className={`${activeItem === 'ProfileSettings' ? style.active  : ''} ${style.sidebarMenu}`} onClick={()=>{handleItemClick("ProfileSettings")}} to={'settings'}>
                    <MdOutlinePerson className={style.menuIcon}/> Profile Settings
                  </NavLink>
         
                  <NavLink className={`${activeItem === 'Security' ? style.active  : ''} ${style.sidebarMenu}`} onClick={()=>{handleItemClick("Security")}} to={'security'}>
                    <BiShieldAlt2 className={style.menuIcon} /> Security
                  </NavLink>
          
                  <div className={style.notification}>
                    <BiBell className={style.menuIcon}/> Notifications
                  </div>
               
                    <div className={style.Line}></div>
              
                  <div style={{color: '#dc2626'}} className={`${style.logoutItem} ${style.sidebarMenu}`} onClick={()=>{logout()}}>
                    <FaSignOutAlt className = {style.menuIcon} /> Logout
                  </div>
              
            </nav>
       
        </div>

        <div className={style.main_content}>
              <Outlet/>
        </div>
      </div>
    </>
  );
};

export default AccountProfile;
