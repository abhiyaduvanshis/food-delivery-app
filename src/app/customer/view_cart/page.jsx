'use client'
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import InnerBanner from "@/_components/InnerBanner";
import ViewCart from "@/_components/ViewCart";

import { useState,useEffect } from "react";


export default function page(){

  const [removeCartData,setremoveCartData] = useState()
  const [cartIds,setcartIds] = useState([])

  const removeToCart=(id)=>{
    setremoveCartData(id)
  }  

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const cartValue = JSON.parse(localStorage.getItem('cart'))
        let localStorageCart=[]
        cartValue?.map((item)=>{
          localStorageCart.push(item.foodId)
        }
      )
      setcartIds(localStorageCart)
      // setcartStorageData(cartValue)
      
    }
 }, [removeCartData]);


  return (
    <>
      <Header removeItem={removeCartData}/>
      <InnerBanner headerName='View Cart'/>
      <ViewCart
      clickRemoveCart={removeToCart} 
      removeCartItem={removeCartData}
      />
      <Footer/>
    </>
  );
}
