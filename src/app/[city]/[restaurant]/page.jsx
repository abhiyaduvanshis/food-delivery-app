import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import InnerBanner from "@/_components/InnerBanner";
import { FaStar } from "react-icons/fa";

export default function page() {
  return (
    <>
    <Header/>
      <InnerBanner headerName='Restaurant Listing'/>
      <section className="w-full bg-gray-50 py-4">
        <div className="container">
          <div className="flex gap-3 ">
              <div className="w-3/4 bg-white p-4 my-3">

                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Best Seller</h2>
                    <div className=" border-b border-solid gap-12">
                      <div className="flex gap-4 mb-4 mt-4 ">
                          <div className="w-1/4">
                            <img className="" src="/resturant/partner/vp-2.png"/>
                          </div>
                          <div className="w-7/12">
                            <h2 className="text-lg font-semibold text-gray-900">Ultimate Loaded Nacho Fiest</h2>
                            <div className="text-md text-gray-600 mb-2 flex items-center gap-2"><FaStar/> 3.9 Rating</div>
                            <div className="border-b border-dashed mb-2"></div>
                            <p className="text-sm  text-gray-600 mb-2">Nacho typically consists of layers of crispy tortilla chips topped with of crispy tortilla chips topped with of crispy tortilla...</p>
                          </div>
                          <div className="w-1/6 text-center flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-orange-400 font-bold mb-4">Rs. 40 </h3>
                            <button className="border border-orange-400 py-1 px-4 rounded-md text-orange-400 font-semibold text-md hover:bg-orange-400 hover:text-white"> + Add</button>
                          </div>
                      </div>
                    </div>
                 </div>


                 <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Special Combos</h2>
                    <div className=" border-b border-solid gap-12">
                      <div className="flex gap-4 mb-4 mt-4 ">
                          <div className="w-1/4">
                            <img className="" src="/resturant/partner/vp-2.png"/>
                          </div>
                          <div className="w-7/12">
                            <h2 className="text-lg font-semibold text-gray-900">Ultimate Loaded Nacho Fiest</h2>
                            <div className="text-md text-gray-600 mb-2 flex items-center gap-2"><FaStar/> 3.9 Rating</div>
                            <div className="border-b border-dashed mb-2"></div>
                            <p className="text-sm  text-gray-600 mb-2">Nacho typically consists of layers of crispy tortilla chips topped with of crispy tortilla chips topped with of crispy tortilla..</p>
                          </div>
                          <div className="w-1/6 text-center flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-orange-400 font-bold mb-4">Rs. 40 </h3>
                            <button className="border border-orange-400 py-1 px-4 rounded-md text-orange-400 font-semibold text-md hover:bg-orange-400 hover:text-white"> + Add</button>
                          </div>
                      </div>
                    </div>

                    <div className=" border-b border-solid gap-12">
                      <div className="flex gap-4 mb-4 mt-4 ">
                          <div className="w-1/4">
                            <img className="" src="/resturant/partner/vp-2.png"/>
                          </div>
                          <div className="w-7/12">
                            <h2 className="text-lg font-semibold text-gray-900">Ultimate Loaded Nacho Fiest</h2>
                            <div className="text-md text-gray-600 mb-2 flex items-center gap-2"><FaStar/> 3.9 Rating</div>
                            <div className="border-b border-dashed mb-2"></div>
                            <p className="text-sm  text-gray-600 mb-2">Nacho typically consists of layers of crispy tortilla chips topped with of crispy tortilla chips topped with of crispy tortilla..</p>
                          </div>
                          <div className="w-1/6 text-center flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-orange-400 font-bold mb-4">Rs. 40 </h3>
                            <button className="border border-orange-400 py-1 px-4 rounded-md text-orange-400 font-semibold text-md hover:bg-orange-400 hover:text-white"> + Add</button>
                          </div>
                      </div>
                    </div>

                    <div className=" border-b border-solid gap-12">
                      <div className="flex gap-4 mb-4 mt-4 ">
                          <div className="w-1/4">
                            <img className="" src="/resturant/partner/vp-2.png"/>
                          </div>
                          <div className="w-7/12">
                            <h2 className="text-lg font-semibold text-gray-900">Ultimate Loaded Nacho Fiest</h2>
                            <div className="text-md text-gray-600 mb-2 flex items-center gap-2"><FaStar/> 3.9 Rating</div>
                            <div className="border-b border-dashed mb-2"></div>
                            <p className="text-sm  text-gray-600 mb-2">Nacho typically consists of layers of crispy tortilla chips topped with of crispy tortilla chips topped with of crispy tortilla..</p>
                          </div>
                          <div className="w-1/6 text-center flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-orange-400 font-bold mb-4">Rs. 40 </h3>
                            <button className="border border-orange-400 py-1 px-4 rounded-md text-orange-400 font-semibold text-md hover:bg-orange-400 hover:text-white"> + Add</button>
                          </div>
                      </div>
                    </div>
                 </div>
                 

                 
                 

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
      <Footer/>
    </>
  );
}
