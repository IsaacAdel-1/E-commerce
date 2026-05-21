import { ClipboardList, Repeat, DollarSign, FileText } from 'lucide-react';

const AnalyticsCards = ()=>{
const AnalyticsCards = [
    {
        id : 1,
        icon : <ClipboardList/> ,
        title : "Total Sales",
        value : 25000,
        color : "#fcefeb",
        description : "+5%",
    },

        {
        id : 2,
        icon : <Repeat/>,
        title : "Total Purchase",
        value : 18000 ,
        color : "#e5f9ed",
        description : "+22%",
    },

        {
        id : 3,
        icon : <DollarSign/>,
        title : "Total Expenses",
        value : 9000 ,
        color : "#e5f8fb",
        description : "+10%",
    },

        {
        id : 4,
        icon : <FileText/>,
        title : "Invoice Due",
        value : 25000 ,
        color : "#fdf7e5",
        description : "+35%",
    },
]
    return(
        <>

        </>
    )
}