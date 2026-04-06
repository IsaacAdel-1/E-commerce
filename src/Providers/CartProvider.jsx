import { useState } from "react";
import CartContext from "../context/CartContext"





const CartProvider = ({children})=>{
const [totalOrders , setTotalOrders] = useState([]);
const [numOfOrders , setnumOfOrders] = useState(0);

const addOrders = (order) => {
  const cartOrder = { ...order, count: 1 };

  setTotalOrders((prev) => {
    const exist = prev.find((x) => x.id === cartOrder.id);

    if (exist) {
      return prev.map((prod) =>
        prod.id === cartOrder.id
          ? { ...prod, count: (prod.count ?? 0) + 1 }
          : prod
      );
    } else {
      numOfOrders((n) => n + 1);
      return [...prev, cartOrder];
    }
  });
};

const clearCart =()=>{
    setTotalOrders([]);
    setnumOfOrders(0)
}

const removeFromCart = (id)=>{
    setTotalOrders(prev => prev.filter((prod)=>prod.id !== id ))
}


    return(
        <CartContext.Provider value={{handleOrders ,totalOrders , numOfOrders , clearCart , removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider ;