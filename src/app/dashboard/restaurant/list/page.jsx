import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import Restaurant from "@/_components/restaurant/Restaurant";
import RestaurantHeader from "@/_components/restaurant/RestaurantHeader";

const page=()=>{

    return (
        <>
        <Header/>
        <RestaurantHeader/>
        <Restaurant/>
        <Footer/>
        </>
    );
}

export default page;