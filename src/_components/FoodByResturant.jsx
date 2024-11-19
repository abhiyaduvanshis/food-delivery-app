'use client'
import { memo, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import userService from "../../services/userService";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import AddToCartBill from "./AddToCartBill";

const FoodByResturant=({clickCart,cartItem,addedFood,clickRemoveCart,removeItem})=>{

    const {city,rid} = useParams()
    const [foodList,setFoodList] = useState([])
    const [loading,setLoading] = useState(true)
    const [cartIds,setcartIds] = useState([])
    

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
    },[])

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
                            <div className=" border-b border-solid gap-12" key={foodItem.foodId}>
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
                                    {
                                      addedFood.includes(foodItem.foodId)?
                                        <button 
                                        className="
                                        border 
                                        border-orange-400 
                                        py-1 
                                        px-4 
                                        rounded-md 
                                        text-orange-400 
                                        font-semibold 
                                        text-md 
                                        hover:bg-orange-400 
                                        hover:text-white"
                                       onClick={()=>clickRemoveCart(foodItem.foodId)}
                                        > - Remove </button>
                                      :
                                      <button 
                                        className="
                                        border 
                                        border-orange-400 
                                        py-1 
                                        px-4 
                                        rounded-md 
                                        text-orange-400 
                                        font-semibold 
                                        text-md 
                                        hover:bg-orange-400 
                                        hover:text-white"
                                        onClick={()=>clickCart(foodItem)}
                                        > + Add</button>
                                    }
                                    
                                  </div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  )
                })}
              </div>
              <AddToCartBill updatedCartItem={cartItem} removeCartItem={removeItem}/>
          </div>
        </div>
      </section>
    );
}

export default memo(FoodByResturant);