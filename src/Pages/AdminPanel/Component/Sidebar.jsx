
import {ShoppingBag} from 'lucide-react'
import {sideBarMenu} from './Component/constants'

const Sidebar = ()=>{

    return(
        <>
                <aside className="sideBarNav bg-[#eee] w-[20%] min-w-[200px] h-[100%] p-4 rounded-lg">
                        <div className="log flex gap-3 mb-6"><ShoppingBag/> 
                            <span className='text-[#3b33dc] text-xl font-semibold'>Modern
                            <span className='text-black'>Shop</span>
                        </span>
                    </div>
                        <ul>
                            {sideBarMenu.slice(0 , 5).map((item)=>{
                                return(
                                <NavLink key = {`${item.to}`} to= {`${item.to}`} className={({isActive})=>`${"p-2 rounded flex gap-3 mb-6"} ${isActive} ? "bg-[#3b33dc] text-white":"" `} end>
                                    {item.icon} {item.item}
                                </NavLink>
                                )
                            })
                            
                                
                            }
                        </ul>

                        

                        <div className="secondary-nav mt-[40px] ">
                        <ul>
                            {
                            sideBarMenu.slice(6 , 9).map((item)=>{
                                return(
                                 <NavLink key = {`${item.to}`} to= {`${item.to}`} className={({isActive})=>`${"p-2 rounded flex gap-3 mb-4"} ${isActive} ? "bg-[#3b33dc] text-white":"" `} end>
                                    {item.icon} {item.item}
                                </NavLink>
                                )
                            })
                            
                                
                            }
                        </ul>
                        </div>
                </aside>
                
        </>
    )
}