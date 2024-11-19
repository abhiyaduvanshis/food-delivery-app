
"use client"
import { memo, useEffect, useState } from "react";


const AddToCartBill=({updatedCartItem,removeCartItem})=>{

  const [cartData,setCartData] = useState([])
  const [subTotal,setSubTotal] = useState(0)
  const [grandTotal,setgrandTotal] = useState(0)
  const [discount,setdiscount] = useState(0)
  const [govTax,setGovTax] = useState(0)
  const [distance,setdistance] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {

        const cartValue = JSON.parse(localStorage.getItem('cart'))
        const totalPrice = cartValue?.reduce((total, item) => Number(total) + Number(item?.price), 0);
        const offerData = Number(totalPrice)*10/100
        const govTax = Number(totalPrice)*18/100
        const totaldistance = 4
        setdistance(totaldistance)
        setGovTax(govTax)
        setdiscount(offerData)
        setSubTotal(totalPrice)
        setgrandTotal((Number(totalPrice)+Number(govTax)+Number(totaldistance*2))-Number(offerData))

        setCartData(cartValue)

        if(removeCartItem){
          console.log(removeCartItem.length)
          if(removeCartItem!==null){
            const filteredCardValue = cartData.filter((item)=>{
              return item.foodId!==removeCartItem
            })
            setCartData(filteredCardValue)
          }
        }
    }
 }, [updatedCartItem,removeCartItem]);


//  useEffect(()=>{
//   if (typeof window !== 'undefined') {
//     if(removeCartItem){
//       console.log(removeCartItem.length)
//       if(removeCartItem!==null){
//         const filteredCardValue = cartData.filter((item)=>{
//           return item.foodId!==removeCartItem
//         })
//         setCartData(filteredCardValue)
//       }
//     }
//   }
//  },[removeCartItem])




    return (
        <div className="w-1/4 bg-white p-4 my-3">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Cart Items</h2>
                <div className="border-b border-solid"></div>
                {cartData?.map((item,index)=>{
                  return(
                    <div className="py-4 border-b border-solid" key={index}>
                      <h2 className="text-black font-semibold flex justify-between mb-4">{item.name}<span>Rs.{item.price}</span></h2>
                      <div className="flex justify-between"><div>Quantity</div>   
                      <div className="flex border border-solid rounded-lg justify-between items-center text-sm text-gray-400 font-semibold"> <button className="px-2 py-1 "> + </button>|<button className="px-2 py-1 text-orange-400"> {item.quantity} </button>|<button className="px-2 py-1"> - </button></div></div>
                    </div>
                  )
                })}
                <div className="pt-4">
                  <h2 className="text-black font-semibold flex justify-between mb-4">Bill Details</h2>
                  <p className="text-black flex justify-between mb-2 text-sm">Sub Total <span> + Rs. {subTotal ? subTotal : '0' }</span></p>
                  <p className="text-black flex justify-between mb-2 text-sm">Delivery Charge ({distance} kms) <span> + Rs. {distance*2}</span></p>
                  <p className="text-black flex justify-between mb-2 text-sm">Discount (10%) <span> - Rs. {discount  ? discount : '0' }</span></p>
                  <p className="text-black flex justify-between mb-2 text-sm">GST + SGST (18%) <span> + Rs. {govTax  ? govTax : '0' }</span></p>
                  <div className="border-b border-solid"></div>
                  <p className="text-black flex justify-between mt-2"><span className="font-semibold">Total</span> <span>Rs. {grandTotal ? grandTotal : '0'}</span></p>
                </div>
              </div>
    );
}

export default memo(AddToCartBill);