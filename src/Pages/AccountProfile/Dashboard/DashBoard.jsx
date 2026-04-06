import { MdOutlineShoppingBag , MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import './DashBoard.css'
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
const DashBoard =()=>{
    const [OrdersEnd , setOrdersEnd] = useState(2);

    const handleOrdersEnd =()=>{
        setOrdersEnd(5)
    }
    const Orders = [
        {
            name : "Order",
            id : "10001",
            NoItems : 3,
            ItemPrice : 250.75,
            status : "Delivered"
        },
        {
            name : "Order",
            id : "10002",
            NoItems : 5,
            ItemPrice : 89.50,
            status : "Pending"
        },
        {
            name : "Furniture Order",
            id : "10003",
            NoItems : 2,
            ItemPrice : 560.00,
            status : "Shipped"
        },
        {
            name : "Book Order",
            id : "10004",
            NoItems : 4,
            ItemPrice : 45.20,
            status : "Cancelled"
        },
        {
            name : "Grocery Order",
            id : "10005",
            NoItems : 10,
            ItemPrice : 120.30,
            status : "Delivered"
        }
        
    ]

    const WishlistItems = [
        {
            name: "Wireless Headphones",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Smart Watch",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
      
    ];
const {user} = useContext(UserContext)
    return(
        <>
            <div className="dashboardContainer">
                <h2>Welcome back, {user.name}! 👋</h2>
                <div className="dashboardContent">
                {/* Start Cards */}
                    <div className="dashboard-cards">

                        {/* First Card */}
                        <div className="totalOrders dashboardCard">
                            <div className="CardData">
                                <p>Total Orders</p>
                                <p>24</p>
                            </div>
                            <div className="CardIcon">
                                <MdOutlineShoppingBag/>
                            </div>
                        </div>
                        {/* 2nd Card */}
                        <div className="TotalSpent dashboardCard">
                            <div className="CardData">
                                <p>Total Spent</p>
                                <p>1,247</p>
                            </div>

                            <div className="CardIcon">
                                <MdOutlineAccountBalanceWallet/>
                            </div>
                        </div>
                        {/* 3rd Card */}
                        <div className="RewardPoints dashboardCard">
                            <div className="CardData">
                                <p>Reward Points</p>
                                <p>1,250</p>
                            </div>

                            <div className="CardIcon">
                                <FaRegStar/>
                            </div>
                        </div>
                    </div>
                {/* Ends Cards */}

                        <div className="OrdersAndWishlist">
                        {/* Recent Orders */}
                        <div className="RecentOrders">
                            <h3 className="RecentOrdersHeader">Recent Orders</h3>
                            <ul className="ordersList">
                                {Orders.slice(0 , 2).map((order)=>{
                                    
                                    return(    
                                        <li className="orderDetails">
                                            <div>
                                                <div className={`icon ${order.status}`} >
                                                    <MdOutlineShoppingBag/>
                                                </div>
                                                <div className="Details">
                                                    <p>{order.name} <span>#{order.id}</span></p>
                                                    <p>{order.NoItems} items <span>• ${order.ItemPrice}</span></p>
                                                </div>
                                            </div>
                                            <p className="status" style={{backgroundColor : order.status == "Delivered" ? "#dcfce7":
                                                order.status == "Pending" ?"#f2f482" :
                                                    order.status == "Shipped" ? "#fef3c7" :"#fc592c" 
                                            }}>{order.status}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <button className="ViewOrders"
                                onClick={()=>{handleOrdersEnd();}}
                            >View All Orders → </button>
                        </div>
                        {/* End Recent Orders */}


                        {/* Start WishList */}
                        <div className="WishList">
                        <h3 className="RecentOrdersHeader">Wishlist Items</h3>
                            <ul className="ordersList">
                                {WishlistItems.slice(0 , 2).map((order)=>{
                                    
                                    return(    
                                        <li className="orderDetails">
                                            <div>
                                                <div className={`icon`} >
                                                    <img src={order.image}/>
                                                </div>
                                                <div className="Details">
                                                    <p>{order.name} <span>#{order.id}</span></p>
                                                    <p>${order.price}</p>
                                                </div>
                                            </div>
                                            <button className="AddProduct">+</button>
                                        </li>
                                    )
                                })}
                            </ul>
                            <button className="ViewOrders"
                                onClick={()=>{handleOrdersEnd();}}
                            >View All Orders → </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard ;