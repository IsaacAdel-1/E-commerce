import DashBoard from "../Dashboard/DashBoard";
import MyOrders from "../MyOrders/MyOrders";
import Wishlist from "../MyWishlist/Mywishlist";
import Address from "../Address/Address";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import Security from "../ProfileSecurity/Security";



const MainContent = ({activeItem }) => {
    switch (activeItem) {
        case 'Dashboard':
            return <DashBoard />
        case 'MyOrders':
            return <MyOrders />
        case 'Wishlist':
            return <Wishlist />
        case 'Address':
            return <Address />
        case 'PaymentMethods':
            return <PaymentMethods />
        case 'ProfileSettings':
            return <ProfileSettings />
        case 'Security':
            return <Security />
        case 'Notifications':
            return <Notifications />
        default:
            return <DashBoard />
    }

}
export default MainContent;