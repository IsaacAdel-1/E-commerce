import { useContext, useEffect, useState, createContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "./LoginPage.css";
import {UAParser} from "ua-parser-js" ;
import Bowser from "bowser";
import { UserContext } from "../../context/userContext";

const LoginPage = () => {

  const {user, setUser , login ,error} = useContext(UserContext)


  const handleChange = (e) => {
    
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(()=>{

    const handleUserAgent = () => {
    
      const parser = new UAParser();
  
      const result = parser.getResult();
      const browser = Bowser.parse(window.navigator.userAgent);
      setUser(prev =>({...prev, browserName : result.browser.name , deviceName : result.device.model , osName : result.os.name 
        , plateForm : browser.platform.type
      }))
  
      /*
      في حالة استخدام prev=> 
        ريأكت بتجمع كل الطلبات اللي بتحصل في نفس او قبل الريفريش و تحطهم مع بعض 
      في حالة لو مستخدمتش ال prev 
      ريأكت مش هتتعامل بنفس الشكل لكن بما ان اول مرة حدثت بيانات و جيت تاني مرة حدثت بيانات فهي هتتاجهل التحديث الاول و تاخد التحديث التاني 
      بمعني يوز سيتيت بتاخد كل الكود مرة واحدة تعدي عليه من اول سطر لتاني سطر وفي الاخر بتروح تشوف ايه النتيجة اللي طلعت 
      بمعني اخر نتيجة طلعت فتكون اخر نتيجة هي اللي اتنفذت 
      */
    }

    handleUserAgent();
  }, [])
 

  const handleSubmit = (e) => {
    
    e.preventDefault();
    login(user)
  };

  return (
    <div className="LoginFormContainer">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="formText">
          <h2>Welcome Back</h2>
          <p>Log in to your account</p>
        </div>

        <div className="formData">
          <div className="formField">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="Enter Your Email"
              value={user.email} onChange={handleChange} />
          </div>

          <div className="formField">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="Create a Password"
              value={user.password} onChange={handleChange} />
          </div>


          </div>

        <p style={{ color: "red" }}>
          {error || ""}
        </p>

        <div className="submitButton">
          <button type="submit" className="btn btn-primary Submit"
           >
            Log In
          </button>
        </div>

        <p className="haveAcc">
          Don't have an account? <a href="/login">Sign Up</a>
        </p>

        <div className="continueWith">
          <p>Or continue with</p>
        </div>

        <div className="waysToLogin d-flex gap-3 justify-content-center align-center">
          <a href="https://www.google.com/" className="google way">
            <span><FcGoogle /></span> Google
          </a>

          <a href="https://www.facebook.com/" className="facebook way">
            <span><FaFacebook /></span> Facebook
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
