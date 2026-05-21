import { LayoutDashboard, ShoppingCart, Package, Users, FileText, Percent, Link2, HelpCircle, Settings  } from 'lucide-react';

export const sideBarMenu = [
        {
            icon : <LayoutDashboard className='text-Indigo-500'/>,
            item : "DashBoard" ,
            to : "dashBoard"
        },
        {
            icon : <ShoppingCart className='text-Indigo-500'/>,
            item : "Orders" ,
            to : "orders"
        },
        {
            icon : <Package className='text-Indigo-500'/>,
            item : "Products" ,
            to : "products"
        },
        {
            icon : <Users className='text-Indigo-500'/>,
            item : "Customers" ,
            to : "customers"

        },
        {
            icon : <FileText className='text-Indigo-500'/>,
            item : "Reports" ,
            to : "reports"
        },
        {
            icon : <Percent className='text-Indigo-500'/>,
            item : "Discounts" ,
            to : "discounts"
        },
        {
            icon : <Link2 className='text-Indigo-500'/>,
            item : "Integrations" ,
            to : "integrations"
        },
        {
            icon : <HelpCircle className='text-Indigo-500'/>,
            item : "Help" ,
            to : "help"
        },
        {
            icon : <Settings className='text-Indigo-500'/>,
            item : "Settings" 
        },
]
