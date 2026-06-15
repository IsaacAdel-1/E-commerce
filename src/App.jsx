import { useState } from 'react'

import Navbar from './components/Navbar/Navbar'
import { Analytics } from "@vercel/analytics/react";
import {BrowserRouter  } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Router from './Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './Providers/UserProvider'
import CartProvider from './Providers/TRyingCartProvider'
const url = "https://www.canva.com/ai/code/thread/71507b40-d862-4984-bdac-9eea6e186924"

function App() {
  const [query, setQuery] = useState([])


  return (
    <>
     {
      
      <BrowserRouter>
      
      <UserProvider>
      <CartProvider>
        <ToastContainer position="bottom-right" autoClose={1500} />
        <Navbar query={setQuery} /> 
        <Router query = {query}  />
        <Footer/>
      </CartProvider>  
      </UserProvider>
      <Analytics />
    </BrowserRouter> }
      
      </>
  )
}

export default App