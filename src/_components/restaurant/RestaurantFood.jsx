'use client'

import { useState,useEffect } from "react";
import { FaEdit,FaTrash } from "react-icons/fa";
import userService from "../../../services/userService";
import Link from "next/link";
import { toast } from "react-toastify";
import DeleteIPopup from "../DeleteIPopup";

const RestaurantFood=()=>{
    const [foodList,setFoodList] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDelete,setIsDelete] =useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await userService.getListData('restaurant/food/list')
                setFoodList(response?.data?.result)
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[isDelete])

    const deleteItempopup = (itemId)=>{
        setIsOpen(true);
        setIsDelete('')
        setSelectedItem('restaurant/food/'+itemId)
    }

    const handleClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    const handleDelete = async()=>{
        try {
            const response = await userService.deleteItemById(selectedItem)
            if(response.data.success==true){
                setIsDelete('deleted')
                toast(response.data.message)
                setIsOpen(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    if(loading){
        return <>Data Loading Please wait .....</>
    }

    return (
        <>

            <DeleteIPopup apiUrl={selectedItem} isOpen={isOpen} onClose={handleClose} onDelete={handleDelete}  />

            <section className="py-4 xl:py-4 w-full">
                <div className="container">
                    <table className="border-collapse border border-gray-300 w-full text-left">
                        <thead className="bg-gray-300">
                            <tr>
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
                                        <td className="border border-slate-300 p-2">{item.name}</td>
                                        <td className="border border-slate-300 p-2"><img className="w-20" src={`/resturant/food/${item.image}`}/></td>
                                        <td className="border border-slate-300 p-2">
                                            
                                            <span className={`rounded-full bg-${item.available ? 'green' : 'red'}-400 text-white text-xs px-2 py-1`}>{item.available ? 'Avilable' : 'Not Avilable'}</span>
                                        </td>
                                        <td className="border border-slate-300 p-2">
                                            <div className="flex">
                                                <div className="px-2 text-blue-500"><Link href={`/food_partner/food/${item._id}`}><FaEdit/></Link></div>
                                                <div className="px-2  text-red-500" onClick={()=>deleteItempopup(item._id)}><FaTrash/></div>
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