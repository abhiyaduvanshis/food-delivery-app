
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import InnerBanner from "@/_components/InnerBanner";
import Restaurants from "@/_components/Restaurants";

export default function page(){
  return (
    <>
      <Header/>
      <InnerBanner headerName='Restaurant Listing'/>
      <section className="w-full bg-gray-50 py-4">
        <div className="container">
            <Restaurants/>
        </div>
      </section>
      <Footer/>
    </>
  );
}
