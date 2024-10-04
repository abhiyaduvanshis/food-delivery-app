import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import RestaurantDashboard from "@/_components/restaurant/ResaurantDashboard";
import RestaurantHeader from "@/_components/restaurant/RestaurantHeader";

const page=()=>{

    return (
        <>
        <Header/>
        <RestaurantHeader/>
        <RestaurantDashboard/>
        <Footer/>
        </>
    );
}

export default page;