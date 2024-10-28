import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import RestaurantCreate from "@/_components/restaurant/RestaurantCreate";
import RestaurantHeader from "@/_components/restaurant/RestaurantHeader";

const page=()=>{

    return (
        <>
        <Header/>
        <RestaurantHeader/>
        <RestaurantCreate/>
        <Footer/>
        </>
    );
}

export default page;