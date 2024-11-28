'use client'

import { useState,useEffect } from "react";
import { FaEdit,FaTrash } from "react-icons/fa";
import userService from "../../../services/userService";
import { useParams,useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RestaurantCreate=()=>{

    const {pid} = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [foodImage,setFoodImage] = useState('')
    const [formInput,setFormInput] =useState({
        name:'',
        description:'',
        lat:'',
        lon:'',
        city:'',
        location:'',
        address:'',
        status:0,
    })

    useEffect(()=>{
        async function fatchData(){
            try {
                if(pid){
                    const response = await userService.getListData('restaurant/partner/'+pid)
                    setFormInput(response?.data?.result[0])
                }
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fatchData();
    },[])


    const handleChangeInput =(e)=>{
        const {name,value} = e.target
        setFormInput({...formInput,[name]:value})
    }

    const handleSelectImage  = (e) =>{
        setFoodImage(e.target.files[0])
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const validate = validationChecker(formInput)
        if(Object.keys(validate).length===0){
            try {
                if(pid){
                    const response = await userService.updateRestFormData('restaurant/partner/'+pid,formInput,foodImage)
                    if(response.data.success===true){
                        toast(response?.data?.message)
                        router.push(`/food_partner/restaurant/list`)
                    }
                }else{
                    const response = await userService.addRestFormData('restaurant/partner',formInput,foodImage)
                    if(response.data.success===true){
                        toast(response?.data?.message)
                       /// router.push(`/dashboard/restaurant/list`)
                    }
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const validationChecker=(value)=>{
        console.log(value)
        const error = {}
        if(!value.name){
            error.name='Name is required'
            toast.error(error.name)
        }
        if(!value.description){
            error.description='Description is required'
            toast.error(error.description)
        }
        if(!value.lat){
            error.lat='Lat is required'
            toast.error(error.lat)
        }
        if(!value.lon){
            error.lon='Lon is required'
            toast.error(error.lon)
        }
        if(!value.city){
            error.city='Lon is required'
            toast.error(error.city)
        }
        if(!value.location){
            error.location='Lon is required'
            toast.error(error.location)
        }
        if(!value.address){
            error.address='Address is required'
            toast.error(error.address)
        }
        return error
    }

    if(loading){
        return <>Data Loading Please wait .....</>
    }

    console.log(formInput)

    return (
        <>
            <section className="py-4 xl:py-4 w-full">
                <div className="container">
                    <form  onSubmit={handleSubmit} encType='multipart/form-data'>
                        <table className="border-collapse border border-gray-300 w-full text-left">
                            <tbody>
                                
                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant Name</td>
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
                                        w-full
                                        p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" 
                                        placeholder="Enter the name"
                                        onChange={handleChangeInput}
                                        value={formInput?.name}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant Description</td>
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
                                        w-full
                                        p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" 
                                        placeholder="Enter the description"
                                        onChange={handleChangeInput}
                                        value={formInput?.description}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant Image</td>
                                    <td className="border border-slate-300 p-2">
                                        <input type="file" name="file" className="w-full" placeholder="Enter the name" onChange={handleSelectImage}/></td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant lat</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                        name="lat" 
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
                                        w-full
                                        p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" 
                                        placeholder="Enter the lat"
                                        onChange={handleChangeInput}
                                        value={formInput?.lat}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant lon</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                        name="lon" 
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
                                        w-full
                                        p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" 
                                        placeholder="Enter the lon"
                                        onChange={handleChangeInput}
                                        value={formInput?.lon}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant City</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                        name="city" 
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
                                        w-full
                                        p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" 
                                        placeholder="Enter the City"
                                        onChange={handleChangeInput}
                                        value={formInput?.city}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant Location</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                        name="location" 
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
                                        w-full
                                        p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" 
                                        placeholder="Enter the Location"
                                        onChange={handleChangeInput}
                                        value={formInput?.location}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="border border-slate-300 p-2">Restaurant Address</td>
                                    <td className="border border-slate-300 p-2">
                                        <input 
                                        name="address" 
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
                                        w-full
                                        p-2.5 
                                        dark:bg-gray-700 
                                        dark:border-gray-600 
                                        dark:placeholder-gray-400 
                                        dark:text-white 
                                        dark:focus:ring-blue-500 
                                        dark:focus:border-blue-500" 
                                        placeholder="Enter the Address"
                                        onChange={handleChangeInput}
                                        value={formInput?.address}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                        <td className="border border-slate-300 p-2">Status</td>
                                        <td className="border border-slate-300 p-2">
                                            <select
                                                name="status"
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
                                                    value={formInput?.status}
                                                >
                                                <option value=''>---Select Available---</option>
                                                <option value='0'>Yes</option>
                                                <option value='1'>No</option>
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

export default RestaurantCreate;