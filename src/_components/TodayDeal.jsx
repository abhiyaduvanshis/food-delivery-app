"use client"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion"
const TodayDeal=()=>{
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
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
      <section className="py-4 xl:py-16 w-full bg-gray-50">
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
            <h1 className="text-3xl font-bold mb-2 mt-2">Today’s Deal</h1>
            <p className="font-semibold text-black/50 gap-10">
            Take a benefit from our latest offers.
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
              <div className="group">
                <div className="border border-gray-50 bg-gray-50 rounded-lg mr-4 group-hover:bg-orange-50">
                  <div className="items-center text-center">
                    <img
                      src="/assets/images/banner1.jpg"
                      className="m-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="border border-gray-50 bg-gray-50 rounded-lg mr-4 group-hover:bg-orange-50">
                  <div className="items-center text-center">
                    <img
                      src="/assets/images/banner2.jpg"
                      className="m-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="border border-gray-50 bg-gray-50 rounded-lg mr-4 group-hover:bg-orange-50">
                  <div className="items-center text-center">
                    <img
                      src="/assets/images/banner3.jpg"
                      className="m-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="border border-gray-50 bg-gray-50 rounded-lg mr-4 group-hover:bg-orange-50">
                  <div className="items-center text-center">
                    <img
                      src="/assets/images/banner4.jpg"
                      className="m-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="border border-gray-50 bg-gray-50 rounded-lg mr-4 group-hover:bg-orange-50">
                  <div className="items-center text-center">
                    <img
                      src="/assets/images/banner5.jpg"
                      className="m-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="border border-gray-50 bg-gray-50 rounded-lg mr-4 group-hover:bg-orange-50">
                  <div className="items-center text-center">
                    <img
                      src="/assets/images/banner1.jpg"
                      className="m-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>


            </Carousel>
          </div>
        </div>
      </section>
    );
}

export default TodayDeal;