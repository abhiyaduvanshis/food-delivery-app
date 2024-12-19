import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import RestaurantHeader from "@/_components/restaurant/RestaurantHeader";
import CustomerOrder from "@/_components/restaurant/CustomerOrder";

const page=()=>{

    return (
        <>
            <Header/>
            <RestaurantHeader/>
            <CustomerOrder/>
            <Footer/>
        </>
    );
}

export default page;