import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";


export const AuthProvider = ({children}) => {
  
    const {user , setUser , loading  } = useContext(UserContext)
    useEffect(()=>{
        setLoading(true)
        const SavedUser = localStorage.getItem('user');
        if(SavedUser){
            setUser(SavedUser);
            loading(false)
        }
    }, [])
    return(
        <>

        </>
    )
}