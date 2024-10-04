import Banner from "@/_components/Banner";
import Brandforyou from "@/_components/Brandforyou";
import Category from "@/_components/Category";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import Restaurants from "@/_components/Restaurants";
import TodayDeal from "@/_components/TodayDeal";
import Image from "next/image";

export default function Home() {
  return (
 
    <>
    <Header/>
    <Banner/>
    <Category/>
    <TodayDeal/>
    <Brandforyou/>
    <Restaurants/>
    <Footer/>
    </>
  );
}
