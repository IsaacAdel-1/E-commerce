import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// خلي Home عادي (عشان أول صفحة تفتح بسرعة)

import Home from "./Pages/HomePage/Home";
import DashBoard from "./Pages/AccountProfile/Dashboard/DashBoard";
import MyOrders from "./Pages/AccountProfile/MyOrders/MyOrders";
import Mywishlist from "./Pages/AccountProfile/MyWishlist/Mywishlist";
import Address from "./Pages/AccountProfile/Address/Address";
import PaymentMethods from "./Pages/AccountProfile/PaymentMethods/PaymentMethods";
import ProfileSettings from "./Pages/AccountProfile/ProfileSettings/ProfileSettings";
import Security from "./Pages/AccountProfile/ProfileSecurity/Security";
import ContactUs from "./Pages/ContactUs/ContactUs";

// خلي باقي الصفحات Lazy
const Shop = lazy(() => import("./Pages/ShopPage/Shop"));
const SingleProduct = lazy(() => import("./Pages/ProductPage/SingleProduct"));
const LoginPage = lazy(() => import("./Pages/LoginAndSignUp/LoginPage"));
const SignUpForm = lazy(() => import("./Pages/LoginAndSignUp/SignUpForm"));
const AccountProfile = lazy(() => import("./Pages/AccountProfile/AccountProfile"));

const Router = ({ query  }) => {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home query={query} />} />
        <Route path="/shop" element={<Shop query={query} />} />
        <Route path="/product/:id" element={<SingleProduct/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/contact-us" element={<ContactUs/>}/>

        {/* Profile Links */}
        <Route path="/profile" element={<AccountProfile />} >
          <Route index element={<DashBoard/>}/>
          <Route path="my-orders" element ={<MyOrders/>}/>
          <Route path="wishList" element ={<Mywishlist/>}/>
          <Route path="Address" element ={<Address/>}/>
          <Route path="payment" element ={<PaymentMethods/>}/>
          <Route path="settings" element ={<ProfileSettings/>}/>
          <Route path="security" element ={<Security/>}/>
          
        </Route>

        
      </Routes>
    </Suspense>
  );
};

export default Router;
