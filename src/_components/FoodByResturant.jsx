'use client'
import { memo, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import userService from "../../services/userService";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const FoodByResturant=()=>{

    const {city,rid} = useParams()
    const [foodList,setFoodList] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
      async function fatchDataFood(){
        try {
          if(rid){
            const response = await userService.getListData('foodByRestaurant/'+city+'/'+rid)
            if(response.data.success===true){
              setFoodList(response.data.result)
            }
          }
        }catch (error) {
            toast.error(error.message)
        }finally{
          setLoading(false)
        }
      }
      fatchDataFood();
    },[city,rid])

    if(loading){
      return <>Data Loading Please wait .....</>
  }

    return (
    <section className="w-full bg-gray-50 py-4">
        <div className="container">
          <div className="flex gap-3 ">
              <div className="w-3/4 bg-white p-4 my-3">

                {foodList.map((category)=>{
                  return (
                    <div className="mb-4" key={category._id}>
                        <h2 className="text-lg font-semibold text-gray-900">{category._id}</h2>
                        {category.foodlist.map((foodItem) => {
                          return(
                            <div className=" border-b border-solid gap-12">
                              <div className="flex gap-4 mb-4 mt-4 ">
                                  <div className="w-1/4">
                                    <img className="" src={`/resturant/food/${foodItem.image}`}/>
                                  </div>
                                  <div className="w-7/12">
                                    <h2 className="text-lg font-semibold text-gray-900">{foodItem.name}</h2>
                                    <div className="text-md text-gray-600 mb-2 flex items-center gap-2"><FaStar/> 3.9 Rating</div>
                                    <div className="border-b border-dashed mb-2"></div>
                                    <p className="text-sm  text-gray-600 mb-2">{foodItem.description}</p>
                                  </div>
                                  <div className="w-1/6 text-center flex flex-col items-center justify-center">
                                    <h3 className="text-2xl text-orange-400 font-bold mb-4">Rs. {foodItem.price} </h3>
                                    <button className="border border-orange-400 py-1 px-4 rounded-md text-orange-400 font-semibold text-md hover:bg-orange-400 hover:text-white"> + Add</button>
                                  </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  )
                })}


              </div>

              <div className="w-1/4 bg-white p-4 my-3">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Cart Items</h2>
                <div className="border-b border-solid"></div>
                <div className="py-4 border-b border-solid">
                  <h2 className="text-black font-semibold flex justify-between mb-4">Ultimate Loaded Nac... <span>Rs.40</span></h2>
                  <div className="flex justify-between"><div>Item</div>   <div className="flex border border-solid rounded-lg justify-between items-center text-sm text-gray-400 font-semibold"> <button className="px-2 py-1 "> + </button>|<button className="px-2 py-1 text-orange-400"> 12 </button>|<button className="px-2 py-1"> - </button></div></div>
                </div>
                
                <div className="py-4 border-b border-solid">
                  <h2 className="text-black font-semibold flex justify-between mb-4">Ultimate Loaded Nac... <span>Rs.40</span></h2>
                  <div className="flex justify-between"><div>Item</div>   <div className="flex border border-solid rounded-lg justify-between items-center text-sm text-gray-400 font-semibold"> <button className="px-2 py-1 "> + </button>|<button className="px-2 py-1 text-orange-400"> 12 </button>|<button className="px-2 py-1"> - </button></div></div>
                </div>

                <div className="py-4 border-b border-solid">
                  <h2 className="text-black font-semibold flex justify-between mb-4">Ultimate Loaded Nac... <span>Rs.40</span></h2>
                  <div className="flex justify-between"><div>Item</div>   <div className="flex border border-solid rounded-lg justify-between items-center text-sm text-gray-400 font-semibold"> <button className="px-2 py-1 "> + </button>|<button className="px-2 py-1 text-orange-400"> 12 </button>|<button className="px-2 py-1"> - </button></div></div>
                </div>

                <div className="py-4 border-b border-solid">
                  <h2 className="text-black font-semibold flex justify-between mb-4">Ultimate Loaded Nac... <span>Rs.40</span></h2>
                  <div className="flex justify-between"><div>Item</div>   <div className="flex border border-solid rounded-lg justify-between items-center text-sm text-gray-400 font-semibold"> <button className="px-2 py-1 "> + </button>|<button className="px-2 py-1 text-orange-400"> 12 </button>|<button className="px-2 py-1"> - </button></div></div>
                </div>

                <div className="pt-4">
                  <h2 className="text-black font-semibold flex justify-between mb-4">Bill Details</h2>
                  <p className="text-black flex justify-between mb-2 text-sm">Sub Total <span>Rs. 610</span></p>
                  <p className="text-black flex justify-between mb-2 text-sm">Delivery Charge (2 kms) <span>Rs. 610</span></p>
                  <p className="text-black flex justify-between mb-2 text-sm">Discount (10%) <span>Rs. 61</span></p>
                  <div className="border-b border-solid"></div>
                  <p className="text-black flex justify-between mt-2"><span className="font-semibold">Total</span> <span>Rs. 700s</span></p>
                </div>
                
              </div>
          </div>
        </div>
      </section>
    );
}

export default memo(FoodByResturant);