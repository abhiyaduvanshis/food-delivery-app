"use client"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import axios from "axios";


const Category=()=>{

  const [category,setCategory]=useState([])

  useEffect(()=>{
      const fatchData = async () =>{
        try {
          const API_URL = process?.env?.NEXT_PUBLIC_END_POINT_URL;
          const token = localStorage.getItem('accessToken')
          const response = await axios.get(
              API_URL+'restaurant/category/list',
            {
              headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
              }
            }
          )

          if(response?.data?.success===true){
            setCategory(response?.data?.result)
          }
          
        } catch (error) {
          console.log(error)
        }
      }

      fatchData();
  },[])


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          maring:4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
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
            <h1 className="text-3xl font-bold mb-2 mt-2">What's on your mind?</h1>
            <p className="font-semibold text-black/50 gap-10">
              Browse out top categories here to discover different food cuision.
            </p>
          </div>

          <div className="">
            <Carousel
              arrows={false} 
              showDots={true}
              responsive={responsive}
              transitionDuration={500}
              dotListClass="custom-dot-list-style"
            >
              {category?.map((item,index)=>{
                return (
                  <div className="group" key={index}>
                    <div className="border border-gray-50 bg-gray-50 rounded-lg py-4 px-8 mr-4 group-hover:bg-orange-50">
                      <div className="items-center text-center">
                        <img
                          src={`/resturant/food-category/${item.image}`}
                          className="w-1/3 m-auto object-contain h-16"
                        />
                        <p className="text-center text-lg group-hover:text-orange-500">{item.name}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </div>
      </section>
    );
}

export default Category;