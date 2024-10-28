'use client'

import { useState,useEffect } from "react";
import { FaEdit,FaTrash } from "react-icons/fa";
import userService from "../../../services/userService";
import { useParams,useRouter } from "next/navigation";
import { toast } from "react-toastify";


const RestaurantCreateFood=()=>{

    const {fid} = useParams()
    const router = useRouter()

    // const [foodList,setFoodList] = useState([])
    // const [loading, setLoading] = useState(true);
    const [foodImage,setFoodImage] = useState('')
    const [error, setError] = useState(null);
    const [catList,setCatList]= useState([])
    const [resList,setResList]= useState([])
    const [inputForm,setInputForm] = useState(
        {
            foodCat:'',
            name:'',
            description:'',
            price:'',
            offerPrice:'',
            available:''
        }
    )

    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await userService.getListData('restaurant/category/list')
                setCatList(response?.data?.result)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    },[])


    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await userService.getListData('restaurant/partner')
                setResList(response?.data?.result)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    },[])


    useEffect(()=>{
        if(fid){
            async function fetchListByIdData() {
                try {
                    const response = await userService.getListData('restaurant/food/'+fid)
                    setInputForm(response?.data?.result)
                } catch (error) {
                    setError(error.message);
                }
            }
            fetchListByIdData();
        }
    },[])


    const handleChangeInput = (e) =>{
        const {name,value} = e.target
        setInputForm({...inputForm,[name]:value})
    }

    const handleSelectImage  = (e) =>{
        setFoodImage(e.target.files[0])
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const validate = validationChecker(inputForm)
        if(Object.keys(validate).length===0){
            try {
                if(fid){
                    const response = await userService.updateFoodFormData('restaurant/food/'+fid,inputForm,fid,foodImage)
                    if(response.data.success===true){
                        toast(response?.data?.message)
                        router.push(`/dashboard/food/list`)
                    }
                }else{
                    const response = await userService.addFoodFormData('restaurant/food/create',inputForm,foodImage)
                    if(response.data.success===true){
                        toast(response?.data?.message)
                        router.push(`/dashboard/food/list`)
                    }
                }
                
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const validationChecker=(inputForm)=>{
        const error = {}
        if(!inputForm.name){
            error.name='Food name is required'
            toast.error(error.name)
        }
        if(!inputForm.description){
            error.description='Food description is required'
            toast.error(error.description)
        }
        if(!inputForm.price){
            error.price='Food price is required'
            toast.error(error.price)
        }
        return error
    }



    return (
        <>
            <section className="py-4 xl:py-4 w-full">
                <div className="container">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <table className="border-collapse border border-gray-300 w-full text-left">
                            <tbody>

                            <tr>
                                    <td className="border border-slate-300 p-2">Food Restaurant</td>
                                    <td className="border border-slate-300 p-2">
                                        <select  
                                            name="restaurant"
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
                                            onChange={handleChangeInput}
                                            value={inputForm?.restaurant}
                                        >
                                            <option value=''>--- Select Restaurant ---</option>
                                            {resList.map((item,index)=>{ 
                                                return(
                                                    <option key={index} value={item._id} >{item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 p-2">Food Category</td>
                                    <td className="border border-slate-300 p-2">
                                        <select  
                                            name="foodCat"
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
                                            onChange={handleChangeInput}
                                            value={inputForm?.foodCat}
                                        >
                                            <option value=''>---Select Category---</option>
                                            {catList.map((item,index)=>{ 
                                                return(
                                                    <option key={index} value={item.name} >{item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 p-2">Food Name</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                            name="name" 
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
                                            placeholder="Enter the name"
                                            onChange={handleChangeInput}
                                            value={inputForm?.name}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 p-2">Food Description</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                            name="description" 
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
                                            placeholder="Enter the name"
                                            onChange={handleChangeInput}
                                            value={inputForm?.description}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Food Image</td>
                                    <td className="border border-slate-300 p-2">
                                        <input type="file" name="file" className="w-full" placeholder="Enter the name" onChange={handleSelectImage}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Food Price</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                            name="price" 
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
                                            placeholder="Enter the name"
                                            onChange={handleChangeInput}
                                            value={inputForm?.price}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Food Offer Price</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                            name="offerPrice" 
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
                                            placeholder="Enter the name"
                                            onChange={handleChangeInput}
                                            value={inputForm?.offerPrice}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Food available</td>
                                    <td className="border border-slate-300 p-2">
                                        <select
                                            name="available"
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
                                                onChange={handleChangeInput}
                                                value={inputForm?.available}
                                            >
                                            <option value='0'>---Select Available---</option>
                                            <option value='1'>Yes</option>
                                            <option value='2'>No</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2"></td>
                                    <td className="border border-slate-300 p-2">
                                        <button
                                        type="submit"
                                        className="
                                        bg-orange-400
                                        text-gray-900 
                                        text-white 
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
                                        >Submit</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </form>
                </div>
            </section>

            
        </>
    );
}

export default RestaurantCreateFood;