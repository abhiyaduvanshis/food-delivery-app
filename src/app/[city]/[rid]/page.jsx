'use client'
import FoodByResturant from "@/_components/FoodByResturant";
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import InnerBanner from "@/_components/InnerBanner";
import { useState,useEffect } from "react";

export default function page() {

  const [cartData,setCartData] = useState()
  const [removeCartData,setremoveCartData] = useState()
  // const [cartStorageData,setcartStorageData] = useState([])
  const [cartIds,setcartIds] = useState([])
  

  const addToCart=(item)=>{
    setCartData(item)
    const localStorageData = JSON.parse(localStorage.getItem('cart'))
    let localStorageCart=cartIds
    localStorageData?.map((valueItem)=>{
      localStorageCart.push(valueItem.foodId)
    })
    setremoveCartData()
  }

  const removeToCart=(id)=>{
    setremoveCartData(id)
    const localIds = cartIds.filter(item=>item!==id)
    setCartData()
 
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
 }, [cartData,removeCartData]);


  return (
    <>
      <Header cartItem={cartData} removeItem={removeCartData} />
      <InnerBanner headerName='Restaurant Listing'/>
      <FoodByResturant clickCart={addToCart} cartItem={cartData} addedFood={cartIds} clickRemoveCart={removeToCart} removeItem={removeCartData} />
      <Footer/>
    </>
  );

}
