import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import RestaurantCreateFood from "@/_components/restaurant/RestaurantCreateFood";
import RestaurantHeader from "@/_components/restaurant/RestaurantHeader";

const page=()=>{

    return (
        <>
        <Header/>
        <RestaurantHeader/>
        <RestaurantCreateFood/>
        <Footer/>
        </>
    );
}

export default page;