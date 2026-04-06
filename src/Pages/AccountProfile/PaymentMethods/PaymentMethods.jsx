import { useState } from "react";
import "./PaymentMethods.css";
import {Set_CreditCard} from '../../../Services/constants';
const PaymentMethods = () => {
    const [cards, setCards] = useState(false);
    const [error , setError] = useState("");
    const [Submit , setSubmit] = useState(false);
    const [newCard, setNewCard] = useState(
        {
            Name : "",
            CardNumber : "",
            ExpiryDate : "",
            CVV : ""
        }
    )
  
    const handleChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value.replace(/\s+/g , '');

        const updatedCard = { ...newCard, [name]: value };
        setNewCard(updatedCard);

        if(!/^\d*$/.test(value) && ( name === "CardNumber" || name === "CVV"  ) ){
            setError("Please enter a valid card");
            setSubmit(false);
           
            return;
        }
        if((updatedCard.CardNumber.length >= 13 && updatedCard.CardNumber.length <= 19) && (updatedCard.CVV.length == 3 || updatedCard.CVV.length == 4)
            && (updatedCard.CardNumber !== "" ) && (updatedCard.CVV !== "") &&  (updatedCard.ExpiryDate !== "") && (updatedCard.Name !== "")
          ){
            setSubmit(true);
            setError("");
            
        }

        else{
            setSubmit(false);
            setError("Please fill all fields");
        }
        
       
        
    }
 


    const handleNewCard = () => {
        setCards(true);
        console.log(cards);
    }
    const submit = async (e)=>{
        e.preventDefault();
       if(!Submit){return;}

       if(!newCard.Name || !newCard.CardNumber || !newCard.ExpiryDate || !newCard.CVV){
        setError("Please fill all fields");
         return;
       }

       if(newCard.CardNumber.length < 13 || newCard.CardNumber.length > 19){
        setError("Please enter a valid card number");
         return;
       }

       if(newCard.CVV.length < 3 || newCard.CVV.length > 4){
        setError("Please enter a valid CVV");
         return;
       }


         try{
            
            const response = await fetch(Set_CreditCard,
                {
                    method : 'POST',
                    headers : {
                        'content-Type' : 'application/json',

                    },
                    body : JSON.stringify(newCard)
                }
            )
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            console.log(data);
            setCards(false);
            
    }
    catch(error){
        console.log(error);
        }
    
}
    return(
        <>
            <div className="PMContainer">
               <header className="d-flex justify-content-between align-items-center">
                    <h2 >Payment Methods</h2>
                    <button onClick={()=>handleNewCard()} className="btn btn-primary">Add New Card</button>
                    
               </header>

               
               <div className={`CRCFormContainer ${cards? "show" : "hide"}`} onClick={()=>setCards(false)} >    
                    <form action="" className="NewCardForm" onClick={(e)=>e.stopPropagation()}  onSubmit={(e)=>submit(e)}>
                        <h3 className="websiteName">Moder<span>n</span>Shop</h3>
                        <label htmlFor="Name">Name on Card</label>  
                        <input type="text" placeholder="Name on Card" name="Name" onChange={(event)=>handleChangeInput(event)} value={newCard.Name}/>
                        <label htmlFor="CardNumber">Card Number</label>  
                        <input type="text" placeholder="Card Number" name="CardNumber" onChange={(event)=>handleChangeInput(event)} value={newCard.CardNumber}/>
                        <label htmlFor="ExpiryDate">Expiry Date</label>  
                        <input type="month" placeholder="Expiry Date" name="ExpiryDate" onChange={(event)=>handleChangeInput(event)} value={newCard.ExpiryDate}/>
                        <label htmlFor="CVV">CVV</label>  
                        <input type="text" placeholder="CVV" name="CVV" onChange={(event)=>handleChangeInput(event)} value={newCard.CVV}/>
                        <button className="btn btn-primary mt-4">Add Card</button>
                        <p style={{color : "red" }}>{error ? error : ""}</p>
                    </form>
                </div>
               
            </div>
        </>
    )
}

export default PaymentMethods;