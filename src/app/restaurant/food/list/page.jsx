import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import RestaurantFood from "@/_components/restaurant/RestaurantFood";
import RestaurantHeader from "@/_components/restaurant/RestaurantHeader";

const page=()=>{

    return (
        <>
        <Header/>
        <RestaurantHeader/>
        <RestaurantFood/>
        <Footer/>
        </>
    );
}

export default page;