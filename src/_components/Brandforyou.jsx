"use client"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import axios from "axios";
const Brandforyou=()=>{

  const [brandList,setbrandList] = useState([])

  useEffect(()=>{
      
      const fatchBrand = async ()=>{

        const API_URL = process?.env?.NEXT_PUBLIC_END_POINT_URL;
        const token = localStorage.getItem('accessToken')
        try {

          const response = await axios.get(
            API_URL+'restaurant/brand/list',
              {
                headers:{
                  "Content-Type":"application/json",
                  "Authorization":`Bearer ${token}`
                }
              }
            )
  
          if(response?.data?.success==true){
            setbrandList(response?.data?.result)
          }  

        }catch (error) {
          console.log(error)
        }
       
      }

      fatchBrand();

  },[])
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
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
          <div className="">
            <div className="w-[80px] h-[2px] bg-slate-100 overflow-hidden">
              <motion.div
                style={{
                  width: "80px",
                  height: "2px",
                  backgroundColor: "#f97e5b",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  ease: "linear",
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 mt-2">Brand For You</h1>
            <p className="font-semibold text-black/50 gap-10">
              Browse out top brands here to discover different food cuision.
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
              {brandList.map((item,index)=>{
                return (
                  <div className="" key={index}>
                    <div className="relative rounded-lg py-4 px-9 mr-4 after:absolute  after:w-[1px]  after:h-1/4  after:left-0  after:border  after:border-l after:top-1/3">
                      <div className="items-center text-center ">
                        <img
                          src={`/resturant/brand/${item.image}`}
                          className=" m-auto object-contain"
                        />
                        <p className="text-center text-lg">{item.name}</p>
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

export default Brandforyou;