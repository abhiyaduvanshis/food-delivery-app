'use client'

import { useState,useEffect } from "react";
import { FaEdit,FaTrash } from "react-icons/fa";
import userService from "../../../services/userService";

const RestaurantFood=()=>{
    const [foodList,setFoodList] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await userService.getRestaurentFood()
                setFoodList(response?.data?.result)
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
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
                                <th  className="border border-slate-300 p-2">Item Avilable</th>
                                <th  className="border border-slate-300 p-2">Name</th>
                                <th  className="border border-slate-300 p-2">Image</th>
                                <th  className="border border-slate-300 p-2">Status</th>
                                <th  className="border border-slate-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodList.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td className="border border-slate-300 p-2"><input type="checkbox"></input></td>
                                        <td className="border border-slate-300 p-2">{item.name}</td>
                                        <td className="border border-slate-300 p-2"><img className="w-20" src={`/resturant/food/${item.image}`}/></td>
                                        <td className="border border-slate-300 p-2">
                                            
                                            <span className={`rounded-full bg-${item.available ? 'green' : 'red'}-400 text-white text-xs px-2 py-1`}>{item.available ? 'Avilable' : 'Not Avilable'}</span>
                                        </td>
                                        <td className="border border-slate-300 p-2">
                                            <div className="flex">
                                                <div className="px-2 text-blue-500"><FaEdit/></div> <div className="px-2  text-red-500"><FaTrash/></div>
                                            </div>
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

export default RestaurantFood;