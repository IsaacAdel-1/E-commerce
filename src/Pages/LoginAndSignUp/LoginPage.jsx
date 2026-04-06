import { useContext, useEffect, useState, createContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "./LoginPage.css";
import {UAParser} from "ua-parser-js" ;
import Bowser from "bowser";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const[UserData , setUserData]=useState({
    email: "",
    password: "",
    browserName: "",
    deviceName: "",
    osName: "",
    plateForm: ""
   
  });

  const {user, setUser , login ,error , loading} = useContext(UserContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(()=>{

    const handleUserAgent = () => {
    
      const parser = new UAParser();
  
      const result = parser.getResult();
      const browser = Bowser.parse(window.navigator.userAgent);
      setUserData(prev =>({...prev, browserName : result.browser.name , deviceName : result.device.model , osName : result.os.name 
        , plateForm : browser.platform.type
      }))
  

    }

    handleUserAgent();
  }, [])
 

  const handleSubmit =  async (e) => {
    
    e.preventDefault();
    const response =  await login(UserData)
    console.log(response);
   if (response && response.status === 'success') {
          console.log("Login successful! Redirecting to Home...");
          navigate('/'); 
      } else {
          console.log("Login condition not met. Status is not 'success'.");
      }
  };

  return (

    <div className="LoginFormContainer">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="formText">
          <h2 className="text-2xl font-bold text-[#3b33dc]">Welcome Back</h2>
          <h3 className="text-xl ">Log in to your account</h3>
        </div>

        <div className="formData">
          <div className="formField">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="Enter Your Email"
              value={UserData.email} onChange={handleChange} />
          </div>

          <div className="formField">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="Create a Password"
              value={UserData.password} onChange={handleChange} />
          </div>


          </div>

        <p style={{ color: "red" }}>
          {error || ""}
        </p>

        <div className="submitButton">
          <button type="submit" className={` ${!loading ? "bg-blue-500":""} px-2 py-1 rounded-lg`} disabled = {loading}
           >
            {loading ? "Loading.." :"Log In"}
          </button>
        </div>

        <p className="haveAcc my-2">
          Don't have an account? <a href="/signup" className="border rounded px-2 py-1 hover:bg-blue-500 hover:text-white">Sign Up</a>
        </p>

        <div className="continueWith">
          <p>Or continue with</p>
        </div>

        <div className="waysToLogin flex gap-3 mt-2">
          <a href="https://www.google.com/" className="google way">
            <span><FcGoogle /></span> Google
          </a>

          <a href="https://www.facebook.com/" className="facebook way ">
            <span><FaFacebook className="text-blue-500"/></span> Facebook
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
