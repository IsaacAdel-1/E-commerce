const Add = (order)=> dispatch({type : "Add" , payload: order} ) ;
const clear = (state)=>dispatch({type : "clear" , payload : state});
const remove = (id)=> dispatch({type : "remove" , payload: id}) ;
const increase = (id) => dispatch({type : "increase" , payload : id});
const decrease = (id)=> dispatch({type : "decrease" , payload : id});

