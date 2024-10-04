"use client"
import { FaTruckPickup,FaMapMarked  } from "react-icons/fa";
import { motion } from "framer-motion"

const Banner=()=>{
    console.log('ihsgfi')
    return (
        <section className="bg-[url('/assets/images/bg-SYBVHDZT.jpg')] pt-36">
            <div className="xl:w-1/2 mx-auto text-center">
                <h1 className=" mb-6 text-6xl bg-gradient-to-r from-orange-400 to-red-400 inline-block text-transparent bg-clip-text font-extrabold italic w-full">Zomo</h1>
                <p className="text-white text-3xl">Discover restaurants that deliver near you</p>
            </div>
            <div className="invisible  xl:visible  relative xl:w-[800px] mx-auto text-center mt-10 overflow-hidden">
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex justify-between items-center pl-8 pr-8 pt-5 pb-5 border border-white/50 rounded-3xl gap-4">
                        <span className="text-5xl text-orange-400"><img src="/assets/images/routing.svg" /></span>
                        <span className="text-white font-semibold">Most Delivery</span>
                    </div>
                    <div className="flex justify-between items-center pl-8 pr-8 pt-5 pb-5 border border-white/50 rounded-3xl gap-4">
                        <span className="text-5xl"><img src="/assets/images/3d-rotate.svg" /></span>
                        <span className="text-white font-semibold">Easiest Order</span>
                    </div>
                    <div className="flex justify-between items-center pl-8 pr-8 pt-5 pb-5 border border-white/50  rounded-3xl gap-4">
                        <span className="text-5xl"><img src="/assets/images/truck.svg" /></span>
                        <span className="text-white font-semibold">Most Delivery</span>
                    </div>
                </div>
            </div>
            
            <motion.img
                    src="/assets/images/scooter.png"
                    alt="Running Bike"
                    style={{
                    width: '90px',
                    position: 'relative',
                    left:'5%',
                    bottom:'-10px'
                    }}
                    animate={{
                        y: [3,10], // Move from x = 0 to x = 200px
                      }}
                      transition={{
                        duration: 1, // 1 second duration
                        ease: 'linear',
                        repeat: Infinity, // Repeat infinitely
                        repeatType: 'reverse', // Alternate direction
                    }}
                />
        </section>
    );
}

export default Banner;