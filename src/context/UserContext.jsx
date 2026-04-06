// UserContext.js
import { createContext } from "react";

export const UserContext = createContext({
  user: null,           
  setUser: () => {},     
  login: () => {},      
  logout: () => {},
  updateData: ()=>{},      
  loading: false,        
  error: null,           
  isAuthenticated: false 
});

// default values instead of undefined to prevent error 