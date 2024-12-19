
"use client"
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useAuthenticationContext } from "@/context/AuthenticationProvider";
import { useRouter } from "next/navigation";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import paymentService from "../../services/paymentService";
import { toast } from "react-toastify";

const ViewCart=({clickRemoveCart,removeCartItem})=>{

    const router = useRouter()

    const [cartData,setCartData] = useState([])
    const [subTotal,setSubTotal] = useState(0)
    const [grandTotal,setgrandTotal] = useState(0)
    const [discount,setdiscount] = useState(0)
    const [govTax,setGovTax] = useState(0)
    const [distance,setdistance] = useState(0)
    const [userAddress,setUserAddress] = useState([])
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');

    const {loginData}= useAuthenticationContext()
    // const socket = io("http://localhost:5000")

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
            if(cartValue){
                setCartData(cartValue)
            }
            
            if(removeCartItem){
                if(removeCartItem!==null){
                const filteredCardValue = cartData.filter((item)=>{
                    return item.foodId!==removeCartItem
                })
                setCartData(filteredCardValue)
                }
            }
        }
    }, [removeCartItem]);


    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await userService.getListData('customer/address')
                setUserAddress(response?.data?.result)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    },[])


    const handleInput =(e)=>{
        const {name,value} = e.target
        setAddress({...address,[name]:value})
    }


    const submitCartData=async(e)=>{
        e.preventDefault()
        const formvalue={}
        const cartValue = JSON.parse(localStorage.getItem('cart'))
        // let localStorageCart=[]
        // cartValue.map((item)=>{
        //     localStorageCart.push(item.name)

        // })

        formvalue.cartData = JSON.stringify(cartValue)
        formvalue.amount = grandTotal
        formvalue.mobile = '9999999999'
        formvalue.name  = loginData.name
        formvalue.address  = address.userAddress
        formvalue.userId  = loginData.id
        formvalue.restId = cartValue[0].restId
        const response = await paymentService.Paymentprocess(formvalue)

        if(response.data.code==="PAYMENT_INITIATED"){
            const redirectUrl =response.data.data.instrumentResponse.redirectInfo.url
            router.push(redirectUrl)
            

        }else{
            toast.error('Payment Faild');
        }
    }

    // useEffect(() => {
    //   socket.on('connect',()=>{
    //     console.log(socket.id)
    //   })
  
    //   return ()=>{
    //     socket.disconnect()
    //   }
  
    // }, []);

    console.log(cartData)

    return (

        

        <section className="w-full bg-gray-50 py-4">
            
            <div className="container">
            {cartData.length>0 ? 
                <form onSubmit={submitCartData}>
                    <div className="flex gap-3">
                        <div className="w-3/4 bg-white p-4 my-3">
                            <table className="border-collapse border border-gray-300 w-full text-left">
                                <thead className="bg-gray-300">
                                    <tr>
                                        <th className="border border-slate-300 p-2">Item Name</th>
                                        <th className="border border-slate-300 p-2">Price</th>
                                        <th className="border border-slate-300 p-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartData?.map((item,index)=>{
                                    return(
                                        <tr  key={index}>
                                            
                                            <td className="border border-slate-300 p-2">
                                                <input type="hidden" name="foodId[]" value={item.foodId}/>
                                                {item.name}
                                            </td>
                                            <td className="border border-slate-300 p-2">Rs.{item.price}</td>
                                            <td className="border border-slate-300 p-2">
                                                <div className="flex">
                                                    <div className="px-2  text-red-500"><span onClick={()=>clickRemoveCart(item.foodId)}>Remove Item</span></div>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })}    
                                </tbody>
                            </table>

                            <div>
                                {userAddress.map((item,index)=>{     
                                return(
                                    <div key={index} className="pt-4">
                                        <h3 className="pb-2"><b>{item.addressType}</b></h3>
                                        <input type="radio" name="userAddress" value={item.address} onChange={handleInput} /> {item.address}
                                    </div>
                                )
                                })}
                            </div>

                            <div className="mt-4">
                                <input 
                                type="submit" 
                                value="Pay" 
                                className="
                                    mt-4
                                    border 
                                    border-green-400    
                                    py-1    
                                    px-4    
                                    rounded-md    
                                    text-white   
                                    font-semibold    
                                    text-md  
                                    bg-green-400"
                                />
                            </div>

                        </div>

                        <div className="w-1/4 bg-white p-4 my-3">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Price Details</h2>
                            <div className="border-b border-solid"></div>
                            <div className="pt-4">
                            <h2 className="text-black font-semibold flex justify-between mb-4">Bill Details</h2>
                            <p className="text-black flex justify-between mb-2 text-sm">Sub Total <span> + Rs. {subTotal ? subTotal : '0' }</span></p>
                            <p className="text-black flex justify-between mb-2 text-sm">Delivery Charge ({distance} kms) <span> + Rs. {distance*2}</span></p>
                            <p className="text-black flex justify-between mb-2 text-sm">Discount (10%) <span> - Rs. {discount  ? discount : '0' }</span></p>
                            <p className="text-black flex justify-between mb-2 text-sm">GST + SGST (18%) <span> + Rs. {govTax  ? govTax : '0' }</span></p>
                            <div className="border-b border-solid"></div>
                            <p className="text-black flex justify-between mt-2">
                                {/* <input type="hidden" name="price" value={grandTotal}/> */}
                                <span className="font-semibold">Total</span> 
                                <span>Rs. {grandTotal ? grandTotal : '0'}</span>
                            </p>
                            </div>
                        </div>
                        
                    </div>
                </form>
                : <p>Empty Cart Item</p> }
            </div>
        </section>
    );
}

export default ViewCart;