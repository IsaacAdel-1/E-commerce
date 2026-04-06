import { useContext, useEffect, useState } from 'react';
import './MyOrders.css'
import { useRef } from 'react';
import CartContext from '../../../context/CartContext';
import {addProductToCart} from '../../../Services/constants'
const MyOrders = () => {

    useEffect(() => {
        try {
            fetch(addProductToCart,
                {
                    method: "GET",

                }
            )
        }
        catch (e) {

        }
    }, [])

    const [ID, setID] = useState([]);

    const { state, Add, clear, remove, increase, decrease } = useContext(CartContext)

    console.log(state);
    const handleReorder = (status, orderId) => {
        if (status === "Delivered") {
            console.log("Reorder");
        }
        else {
            const isConfirm = window.confirm("Are you sure you want to cancel this order?");
            if (isConfirm) {
                remove(orderId)
            }

            return;

        }
    }
    const handleDetails = (id, e) => {
        e.preventDefault();
        if (ID.includes(id)) {
            setID(ID.filter(Id => Id != id));

        }
        else if (!ID.includes(id)) {
            setID([...ID, id]);
        }

        const cardElement = e.currentTarget.closest(".OrderInDetailsCard");
        if (!cardElement) return;

        // لو ما عندكش هيدر ثابت:
        cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return (
        <>
            <div className="MyOrdersContainer p-2 ">
                <header className="d-flex justify-content-between align-item-center ">
                    <h3>My Orders</h3>
                    <div className="MyOrdersOptions">
                        <select name="" id="" className="selectOrders">


                            <option value="all-orders" className="selectOrders">All Orders</option>
                            <option value="delivered">Delivered</option>
                            <option value="in-transit">In Transit</option>

                        </select>
                    </div>
                </header>
                {
                    state.map((order) => {
                        let PRICE = 0

                        return (
                            <div className="OrderInDetailsCard" key={order.id}>
                                <div className="order-header">

                                    <div className="order-info">
                                        <p className="order-number text-2xl">{order.title}</p>
                                        <img src={order.images[0]} alt="" width={60} className={ID.includes(order.id) ? 'hidden' : ''} />
                                    </div>

                                    <div className="order-actions">
                                        <span className={`order-status ${order.status}`}>Quantity: {order.count}</span>
                                        <a className="view-details" onClick={(e) => { handleDetails(order.id, e); }}>{ID.includes(order.id) ? "Hide Details" : "View Details"}</a>
                                    </div>
                                </div>


                                <div className={`grid overflow-hidden transition-[grid-template-rows] duration-1000 ease-out
                                        ${ID.includes(order.id) ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                                    `}
                                >
                                    <div
                                        className={`overflow-hidden transition-[opacity,transform] duration-500 ease-out
                                        ${ID.includes(order.id) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                                        `}
                                    >
                                        <div className="pt-3">
                                            <div className="order-progress">
                                                <h4>{order.brand}</h4>
                                                <div className={`${order.status} progress-bar`}></div>
                                            </div>
                                            <img src={order.images[0]} alt="" width={200} />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className={` overflow-hidden transition-all duration-1000 ease-out
                                            ${ID.includes(order.id)
                                            ? "max-h-[400px] opacity-100 translate-y-0"
                                            : "max-h-0 opacity-0 -translate-y-1"}
                                        `}
                                        >
                                        <div className="pt-3">
                                            <div className="order-progress">
                                            <h4>Order Progress</h4>
                                            <div className={`${order.status} progress-bar`}></div>
                                            </div>
                                            <img src={order.images[0]} alt="" width={200} />
                                        </div>
                                    </div> */}
                                <div className="line"></div>

                                <div className="order-footer flex justify-center items-center">
                                    <div className="TotalPrice text-lg ">${order.price}</div>

                                    {/* Footer Buttons */}
                                    <div className="footer-buttons flex flex-wrap justify-start ">
                                        <button className=' h-9 w-9 py-2 px-2 bg-[#4f46e5] text-[#fdfbfe] group relative increase'
                                            onClick={() => { increase(order.id) }}
                                        >+
                                            <span className='hidden group-hover:block absolute -translate-x-1/2 -left-4 -bottom-7
                                            bg-black text-white rounded whitespace-nowrap px-1 text-base
                                        '>Increase Quantity</span>

                                        </button>


                                        <button className=' h-9 w-9 py-2 px-2 bg-[#4f46e5] text-[#fdfbfe] group relative decrease'
                                            onClick={() => { decrease(order.id); }}
                                        >-

                                            <span className='hidden group-hover:block absolute -translate-x-1/2 -left-4 -bottom-7
                                            bg-black text-white rounded whitespace-nowrap px-1 text-base'>Decrease Quantity</span>
                                        </button>

                                        {order.status !== "Cancelled" ? <button className={`ReorderBut ${order.status !== "Delivered" ? "Cancelled" : ""}`}
                                            onClick={() => { handleReorder(order.status, order.id) }}
                                        >
                                            {order.status === "Delivered" ? "Reorder"
                                                : "Cancel Order"}</button> : ""}
                                        <button className='TrackPackage'>Track Package</button>
                                    </div>

                                </div>
                            </div>
                        )

                    })

                }

                <div className="clearBtn">
                    <button onClick={() => { clear() }} className='bg-red-600 p-2 rounded text-white'>Clear Cart</button>
                </div>
            </div>
        </>
    );
};
export default MyOrders;