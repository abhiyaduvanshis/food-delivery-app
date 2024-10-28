
"use client"
import { useRouter }  from "next/navigation";
import { useState,useEffect,memo, useMemo } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Location from "./Location";
import { useAuthenticationContext } from "@/context/AuthenticationProvider";
import Link from "next/link";
import AuthService from "../../services/useAuth";
import { toast } from "react-toastify";


const Header=()=>{

    const router = useRouter()
    const [isVisible,setisVisible] = useState(false)

    const {loginData, loading, error}  = useAuthenticationContext()

    const dropdownMenu = () =>{
        setisVisible(!isVisible)
    }
    useMemo(()=>{
       return  dropdownMenu()
    },[])

    const logout = () =>{
        const response = AuthService.UserLogOut()
        console.log(response)
        toast(response?.data?.message)
        router.push(`/dashboard/login`)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <header className=" py-2 xl:py-2 w-full bg-[#222021]" >
            <div className="container mx-auto flex justify-between items-center">
                <div className="gap-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-white font-bold text-3xl uppercase italic">Zomo <span className="text-orange-400">.</span></h2>
                    </div>
                    <div className="">
                        <Location/>
                    </div>
                </div>
              
                <div className="">
                {/* <ul>
                        <li>
                            Home
                        </li>
                        <li>
                            Order
                        </li>
                        <li>
                            About Us
                        </li>
                        <li>
                            Contact Us
                        </li>
                    </ul> */}
                </div>

                <div className="hidden xl:block">
                    <div className="flex justify-between items-center gap-5">
                        <div className="flex static relative">
                            <FaShoppingCart className="text-white text-1" /> 
                            <span className="absolute bg-orange-400 rounded-full w-4 h-4 text-xs text-center right-[-7px] top-[-8px]">2</span>
                        </div>
                        <div  className="text-white/50 text-sm"> | </div>
                        <div className="flex gap-2">
                            <div className="w-[30px]"><img src="/assets/images/p5.png" className="w-full rounded-full"/></div>
                            <div className="text-white" onClick={dropdownMenu}>
                                <p className="text-white/50 text-xs">Hi, {loginData?.name}</p>
                                <p className="text-sm">My Account</p>
                            </div>

                       
                            <div className={`absolute bg-white text-gray-800 p-2 rounded-md top-14 ${isVisible ? 'hidden' : 'block'}`}>
                                <ul>
                                    <li className="font-normal text-sm hover:text-orange-400 p-1"><Link href="">Profile</Link></li>
                                    <li className="font-normal text-sm hover:text-orange-400 p-1"><Link href="">My Order</Link></li>
                                    <li className="font-normal text-sm hover:text-orange-400 p-1"><Link href="">Save Address</Link></li>
                                    <li className="font-normal text-sm hover:text-orange-400 p-1" onClick={logout}>LogOut</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </header>
    );
}

export default memo(Header);