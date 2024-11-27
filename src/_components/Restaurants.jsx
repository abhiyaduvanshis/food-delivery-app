"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { FaMapMarker,FaClock,FaStar } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
const Restaurants=()=>{

    const {city} = useParams()
    const [resturantList,setresturantList] = useState([])

    useEffect(()=>{
        
        const fatchBrand = async ()=>{
  
          const API_URL = process?.env?.NEXT_PUBLIC_END_POINT_URL;
          const token = localStorage.getItem('accessToken')
          const getCity = JSON.parse(localStorage.getItem('userLocation'))

          try {
  
            const response = await axios.get(
              API_URL+'restaurant/partner/city/'+getCity?.city.toLowerCase(),
                {
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                  }
                }
              )
    
            if(response?.data?.success==true){
                setresturantList(response?.data?.result)
            }  
  
          }catch (error) {
            console.log(error)
          }
         
        }
  
        fatchBrand();
  
    },[])

    return (
      <section className="py-4 xl:py-16 w-full">
        <div className="container ">
          <div className="mb-6">
            <div className="w-[60px] h-[2px] bg-slate-100 overflow-hidden">
              <motion.div
                style={{
                  width: "60px",
                  height: "2px",
                  backgroundColor: "#f97e5b",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  ease: "linear",
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 mt-2">Popular Restaurants</h1>
            <p className="font-semibold text-black/50 gap-10">Find nearby popular Restaurants.</p>
          </div>

          <div className="grid xl:grid-cols-4 gap-6">
            {resturantList.map((item,index)=>{
                return (
                    <div className="border rounded-md group" key={index}>
                        <Link href={`/${city ? city : item.city }/${item._id}`}>
                          <div className="p-3">
                              <div className="rounded-md overflow-hidden">
                                  <img src={`/resturant/partner/${item.image}`} className="rounded-md hover:scale-125 transition-all duration-500 cursor-pointer"/>
                              </div>
                              <div className="flex mt-2">
                                  <h2 className="text-black font-bold w-full">{item.name} <span className="text-black font-bold float-right flex justify-between items-center gap-1"><FaStar className="text-sm text-green-500"/> 3.9</span></h2>
                              </div>
                              <div className="w-full mt-2">
                                  <p className="text-gray-500">{item.description}</p>
                              </div>
                              <div className="w-full border border-dashed mt-2"></div>
                              <div className="flex mt-2 justify-between">
                                  <div className="flex float-left justify-between items-center gap-1"><span><FaMapMarker className="text-sm text-orange-400"/> </span> 3.9 km</div>
                                  <div className="flex float-right justify-between items-center gap-1"><span><FaClock className="text-sm text-orange-400"/> </span>35 min</div>
                              </div>
                          </div>
                        </Link>
                    </div>
                )
            })}    

          </div>
        </div>
      </section>
    );
}

export default Restaurants;