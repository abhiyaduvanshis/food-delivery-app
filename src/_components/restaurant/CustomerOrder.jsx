'use client'

import { useState,useEffect } from "react";
// import { FaEdit,FaTrash } from "react-icons/fa";
import userService from "../../../services/userService";
// import { useAuthenticationContext } from "@/context/AuthenticationProvider";
// import { useParams } from "next/navigation";
import io from 'socket.io-client';


const CustomerOrder=()=>{
    const socket = io("http://localhost:5000")
    const [customerOrderList,setCustomerOrderList] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await userService.getListData('restaurant/viewOrder')
                setCustomerOrderList(response?.data?.result)
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        socket.on('user_list', (data) => {
            console.log(data,'data ststus')
            async function fetchData() {
                try {
                    const response = await userService.getListData('restaurant/viewOrder')
                    setCustomerOrderList(response?.data?.result)
                } catch (error) {
                    setError(error.message);
                }finally{
                    setLoading(false);
                }
            }
            fetchData();
        })
        return () => {
            socket.off('user_list');
        };
    },[])



    if(loading){
        return <>Data Loading Please wait .....</>
    }

    return (
        <>

        
            <section className="py-4 xl:py-4 w-full">
                <div className="container">
                    <table className="border-collapse border border-gray-300 w-full text-left">
                        <thead className="bg-gray-300">
                            <tr>
                                <th  className="border border-slate-300 p-2">Order List</th>
                                <th className="border border-slate-300 p-2">Total Price</th>
                                <th className="border border-slate-300 p-2">Pyament Status</th>
                                <th className="border border-slate-300 p-2">Food Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerOrderList?.map((item,index)=>{

                                let subtotalprice = 0;
                                const customerFood  = JSON.parse(item.cartData)

                                return(
                                    <tr key={index}>
                                        <td className="border border-slate-300 p-2">
                                            <table className="border-collapse border border-gray-300 w-full text-left">
                                                <thead className="bg-gray-300">
                                                    <tr>
                                                        <th className="border border-slate-300 p-2">Name</th>
                                                        <th className="border border-slate-300 p-2">Quantity</th>
                                                        <th className="border border-slate-300 p-2">Price</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                              
                                                customerFood.map((foodItem,itemindex)=>{
                                                    const pricedata = foodItem?.price
                                                     subtotalprice=Number(subtotalprice)+Number(pricedata)
                                                    return(
                                                        <tr key={itemindex}>
                                                            <td className="border border-slate-300 p-2">{foodItem.name}</td>
                                                            <td className="border border-slate-300 p-2">{foodItem.quantity}</td>
                                                            <td className="border border-slate-300 p-2">{foodItem.price}</td>
                                                        </tr>
                                                    )})}
                                                </tbody>
                                            </table>
                                             
                                        </td>
                                        <td className="border border-slate-300 p-2">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td><b>Sub Total :</b> Rs. {subtotalprice} </td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Delivery Charge (4 kms) :</b> + Rs. 8</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Discount (10%) :</b> - Rs. {Number(subtotalprice)*10/100}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>GST + SGST (18%) :</b> + Rs. {Number(subtotalprice)*18/100}</td>
                                                    </tr>

                                                    <tr>
                                                        <td><b>Promo - Zomo :</b> -Rs. {Number(subtotalprice)*22/100}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Total Amount : </b> {subtotalprice+8-Number(subtotalprice)*10/100+Number(subtotalprice)*18/100-Number(subtotalprice)*22/100}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="border border-slate-300 p-2">

                                            {(item.status==='1' && item.status!=='2' && item.status!=='3') ? 
                                                <span className="rounded-full bg-orange-400 text-white text-xs px-2 py-1">Payment Initiated</span>
                                               
                                            :   
                                                <span className="rounded-full bg-green-400 text-white text-xs px-2 py-1">Payment Completed</span>
                                            }

                                        </td>
                                        <td className="border border-slate-300 p-2">

                                           <select 
                                           className="
                                           w-full    
                                           bg-gray-50    
                                           border    
                                           border-gray-300    
                                           text-gray-900    
                                           text-sm    
                                           rounded-lg    
                                           focus:ring-blue-500    
                                           focus:border-blue-500    
                                           block    
                                           p-2.5    
                                           dark:bg-gray-700    
                                           dark:border-gray-600    
                                           dark:placeholder-gray-400    
                                           dark:text-white    
                                           dark:focus:ring-blue-500    
                                           dark:focus:border-blue-500"
                                           >
                                                <option>Food Prepaer</option>
                                                <option>Food Done</option>
                                                <option>Food Dispatch</option>
                                           </select>
                                            
                                        </td>

                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                </div>
            </section>

        </>
    );
}

export default CustomerOrder;