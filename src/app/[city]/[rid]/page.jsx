import FoodByResturant from "@/_components/FoodByResturant";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import InnerBanner from "@/_components/InnerBanner";


export default function page() {
  return (
    <>
    <Header/>
      <InnerBanner headerName='Restaurant Listing'/>
      <FoodByResturant/>
      <Footer/>
    </>
  );
}
