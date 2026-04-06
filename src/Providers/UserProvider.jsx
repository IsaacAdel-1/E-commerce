
// UserProvider.jsx
import { useState, useCallback, useEffect } from "react";
// import { UserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const UserProvider = ({ children }) => {
  const navigator = useNavigate()
  const emptyUser = {
    email: "",
    password: "",
    browserName: "",
    deviceName: "",
    osName: "",
    plateForm: ""
  };
  const [user , setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        return JSON.parse(saved); 
      } catch (e) {
        return emptyUser; 
      }
    }
    return emptyUser; 
  });

  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(null)

  const API_BASE = "http://localhost/ModernShopWebsite";
  const isAuthenticated = !!user?.email ;
  //  !! convert into boolean value true or false
  //   useEffect(() => {
  //   const saved = localStorage.getItem("user");
  //   if (saved) {
  //     try {
  //       setUser(JSON.parse(saved.userData));
  //     } catch {
  //       // localStorage.removeItem("user");
  //       console.log("user has deleted successfully")
  //     }
  //   }
  // }, []);

  const updateData = async (userData)=>{
   const updatedUser = { ...(user || {}), ...userData };

  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));

  try{
    setError(null)
    setLoading(true)

    const response = await fetch(`${API_BASE}/UpdateUserData.php`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(updatedUser),
      credentials : 'include'
    })
    const data = await response.json();
    if(!response.ok){
      throw new Error (data.message || "Update failed")
    }
    return data ;
  }
  catch(err){setError(err.message)}
  finally{
    setLoading(false)
  }
}
  const login = useCallback(async (credentials)=>{
      
        try{
            setError(null);
            setLoading(true);
            const response = await fetch(`${API_BASE}/LoginRequest.php`, {
                method : 'POST',
                headers :{
                    'Content-Type': 'application/json',

                },
                body:JSON.stringify(credentials),
                credentials : 'include'
            })
            const data = await response.json()
            console.log(data)
            if(!response.ok){
              
              throw new Error (data.message || "Error in login")
            }
            
            setUser({ ...data.userData });
            console.log(user);
            localStorage.setItem('user', JSON.stringify(data.userData));
            return data ;
        }
        catch(err){
            setError(err.message)
            console.error("Error : "+ err.message )
            return null ;
        }
        finally{
            setLoading(false)
        }
  }, [])

  const logout =()=>{
    try{
     localStorage.removeItem('user');
    setUser({
      email: "",
      password: "",
      browserName: "",
      deviceName: "",
      osName: "",
      plateForm: ""
    })
    setError(null)
    setLoading(false)
    console.log("user is Deleted" + user);
    navigator('/')
    window.scrollTo(0,0)
  }
  catch (e){
    console.error("can't delete user "+e)
  }
  }
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateData,
        loading,
        error,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
