import { useState } from 'react'

import Navbar from './components/Navbar/Navbar'

import {BrowserRouter  } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Router from './Router'

import UserProvider from './Providers/UserProvider'
import CartProvider from './Providers/TRyingCartProvider'
const url = "https://www.canva.com/ai/code/thread/71507b40-d862-4984-bdac-9eea6e186924"

function App() {
  const [query, setQuery] = useState("")


  return (
    <>
     {
      <BrowserRouter>
      
      <UserProvider>
      <CartProvider>
        <Navbar query={setQuery} />
        <Router query = {query}  />
        <Footer/>
      </CartProvider>  
      </UserProvider>
      
    </BrowserRouter> }
  
      </>
  )
}

export default App