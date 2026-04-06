import { useReducer } from "react";
import CartContext from "../context/CartContext";
import { useEffect } from "react";
const CartProvider = ({children})=>{
const initCart = ()=>{

        const saved = localStorage.getItem("cartProducts");
        return saved ? JSON.parse(saved) : [] ;
   
}
const addOrders = (state , order) => {
  const cartOrder = { ...order, count: 1 };

  const isExist = state.some((prod)=> prod.id === cartOrder.id )
  

    if (isExist) {
       const NewProducts =  state.map((prod) =>
        prod.id === cartOrder.id
          ? { ...prod, count: (prod.count ?? 0) + 1 }
          : prod
      );
      return NewProducts ;
    } else {
      
      return [...state, cartOrder];
    }
  
};
const clearCart =(state)=>{
    
    const isConfirm = confirm("Are you sure you want to clear the Cart ?");
    return isConfirm ? [] : state;
    
}

const removeFromCart = (state , id)=>{
    const NewProducts = state.filter((prod)=>prod.id !== id );
    return NewProducts ;
}

const increaseQuantity = (state , id)=>{
    const NewProducts = state.map((prod)=>{
      return  prod.id === id ? {...prod , count :(prod.count ?? 0)+1}:prod
    })
    return NewProducts;
}

const decreaseQuantity = (state , id)=>{



    const item =state.find(p => p.id === id );

    if(!item) return state ;



    if((item.count??0) === 1){

      return removeFromCart(state , id)

    }

    return state.map(p =>

    p.id === id ? { ...p, count: (p.count ?? 0) - 1 } : p

  );

  }





const reducer =(state , action)=>{


    switch (action.type) {
        case "Add":
           return addOrders(state , action.payload );
            
        case "clear":
            return clearCart(state);
           
        case "remove":
            return removeFromCart(state , action.payload);
        case "increase":
            return increaseQuantity(state ,  action.payload) ;
        case "decrease":
            return decreaseQuantity(state , action.payload) ;
        
        default : return state ; 
    }
    
}
const [state , dispatch] = useReducer( reducer, [] ,initCart);
const Add = (order)=> dispatch({type : "Add" , payload: order} ) ;
const clear = (state)=>dispatch({type : "clear" , payload : state});
const remove = (id)=> dispatch({type : "remove" , payload: id}) ;
const increase = (id) => dispatch({type : "increase" , payload : id});
const decrease = (id)=> dispatch({type : "decrease" , payload : id});
useEffect(() => {
  localStorage.setItem("cartProducts", JSON.stringify(state));
}, [state]);
   return(
        <CartContext.Provider value={{state , Add , clear , remove , increase , decrease}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;