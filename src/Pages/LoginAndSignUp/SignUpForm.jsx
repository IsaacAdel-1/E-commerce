
// import './SignUpForm.css'
import './SignUpForm.css'
import React, { useState, useEffect, useRef } from 'react'
import {evaluatePasswordStrength } from '../../Utilities/evaluatePasswordStrength'
import FormInput from '../../components/InputForm/FormInput';
import { IoClose } from "react-icons/io5";
const Form_Design = "https://www.canva.com/ai/code/thread/6e4e633b-a893-4490-a954-318c528a969d";

const SignUpForm = () => {

    // const [confirmPassword, setConfirmPassword] = useState("");
    const [strength, setStrength] = useState("");
    const [logInError, setLogInError] = useState("");
    const [imageUrl , setImageUrl] = useState(null);
    let ImageRef = useRef(null)
    let ImgRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        dateOfBirth: "",
        Gender: ""
    });

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData(prev => ( { ...prev, [name]: value }));

        if(name == "password"){
            setStrength(evaluatePasswordStrength(value))
        }
    };


    const handleCloseImage = ()=>{
        setImageUrl(null);

        if(ImageRef.current){
            ImageRef.current.value = ""
        }

    }
    
   
const handleLabelClick = () => {
    
    if (ImageRef.current) {
        ImageRef.current.click();
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🔥 FORM SUBMITTED!");
        const SubmittedData = new FormData(e.target) ;
      
        if(ImageRef.current)
        {
            SubmittedData.append("image", ImageRef.current.files[0])
        }
        console.log("Form Data:", SubmittedData);
        try {
            const res = await fetch("http://localhost/ModernShopWebsite/SignUpReqeust.php", {
                method: "POST",
                body: SubmittedData,
            });
            const data = await res.json();
            if(data.status == "success"){
                window.location.href = "/login";
            }
            console.log("Server response:", data);
        } catch (err) {
            console.error("Error sending data:", err);
        }
    };

    const handleImage =  (e)=>{
        if (ImageRef.current && ImageRef.current.files[0]) {
        const file = ImageRef.current.files[0];
        setImageUrl(URL.createObjectURL(file));  
    }
    }


    return (
        <>
            <div className="FormContainer">

                <form method='post' className="signUpForm" onSubmit={handleSubmit} encType='multipart/form-data'>
                {/* Form Header */}
                    <div className="websiteLogo">
                        <img src="../images/Logo for Mod Shop brand with shopping cart icon.png" alt="" />
                    </div>
                    <div className="formText">
                        <h2>Create an Account</h2>
                        <p>Sign up to get started</p>
                    </div>
                {/* End of form header */}
                    <div className="formData">
                        {
                            // Full Name
                            <FormInput label = "Full Name"  type = "text" name = "name" value = {formData.name}  
                            onChange ={ handleChange}  placeholder= "Enter Your Name"  required = "require"/>
                        }
                      

                        {
                            // Email
                            <FormInput label = "Email Address"  type = "email" name = "email" value = {formData.email}  
                            onChange ={ handleChange}  placeholder= "Enter Your Email"  required = "require"/>
                        }
     

                        <div className="password">
                         {
                            // Password
                            <FormInput label= "Password"  type = "password" name ="password" value = {formData.password}  
                            onChange = {handleChange} placeholder = "Create a Password"  required = "require"/>
                        }
                         
                            {/* Showing Password strength */}
                            <div className="passwordStrength">

                                <div className="PasswordValue">
                                    <p>Password strength:</p>
                                    <p >{ strength ? strength : "Not Enteried"}</p>
                                </div>

                                <div className={`passwordStrengthMeter ${strength}`}></div>
                             
                            </div>
                            {/* End of Showing Password strength */}
                       

                        </div>
                         {
                            // confirm Password
                            <FormInput label= "Confirm Password"  type = "password" name ="confirmPassword" value = {formData.confirmPassword}
                            onChange = {handleChange} placeholder = "Confirm Your Password"  required = "require" ExtraClasses ="CofirmPassword" />
                        }
                       
                        {
                            // Phone Number
                            <FormInput label= "Contact Number"  type = "tel"  name ="phoneNumber"  value = {formData.phoneNumber} 
                         onChange = {handleChange}  placeholder= "Enter Your Contact Number"  required = "require"/>
                       
                        }
                        {
                            // birthday
                            <FormInput  label= "Choose your date of birth"    type = "date"   name ="dateOfBirth"   value = {formData.dateOfBirth} 
                                onChange = {handleChange}   placeholder= "Enter Your Contact Number"    required = "require"/>
                        }
                        
                           {
                               <FormInput label = "Gender"  type = "select"  name = "Gender"  value = {formData.Gender}  
                                onChange = {handleChange}  placeholder= ""  required = "require"  Options = {["Select Gender" , "Male" , "Female"]}/>
                            }
                        
                            
                          
                            <div className="formField mt-7">
                                <label htmlFor="image" onClick={()=>{handleLabelClick()}} className='cursor-pointer'>Upload Image</label>
                                <input type="file" id ="image" accept='image/*' name='image' ref={ImageRef} onChange={handleImage} className='cursor-pointer '/>

                                <div className="previewImage" >

                                    {imageUrl != null ? <IoClose onClick={()=>{handleCloseImage()}} className='cursor-pointer'/> : ""}
                                    {imageUrl != null ? <img src={imageUrl} alt="preview" 
                                        style={{ maxWidth: "200px", maxHeight: "200px" }} ref={ImgRef}
                                    />:""}
                                </div>
                            </div>

                    </div>
                    <div className="submitButton">
                        <button type="submit" className="btn btn-primary Submit"  >Create Account</button>
                    </div>
                    <p className='haveAcc'>Already have an account? <a href="/login">Log In</a></p>
                </form>

            </div>
        </>
    )
}

export default SignUpForm;