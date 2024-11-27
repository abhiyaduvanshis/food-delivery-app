
"use client"
import { useRouter }  from "next/navigation";
import { useState,useEffect,memo, useMemo } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Location from "./Location";
import { useAuthenticationContext } from "@/context/AuthenticationProvider";
import Link from "next/link";
import AuthService from "../../services/useAuth";
import { toast } from "react-toastify";


const Header=({cartItem,removeItem})=>{

    const router = useRouter()
    const [cartStorage, setStoredValue] = useState('');
    const [isVisible,setisVisible] = useState(false)
    const [itemCount,setItemCount] = useState(cartStorage?.length)
    const [cartData,setCartData] = useState(cartStorage)
    
    const {loginData, loading, error}  = useAuthenticationContext()

    const dropdownMenu = () =>{
        setisVisible(!isVisible)
    }

    useMemo(()=>{
       return dropdownMenu()
    },[])

    const logout = () =>{
        const response = AuthService.UserLogOut()
        console.log(response)
        toast(response?.data?.message)
        router.push(`/login`)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartValue = JSON.parse(localStorage.getItem('cart'))
            setStoredValue(JSON.parse(localStorage.getItem('cart')));
            setItemCount(cartValue?.length)
            setCartData(cartValue)
        }
     }, []);


    useEffect(()=>{
        if(cartItem){
            if(itemCount){
                if(cartItem.restId !== cartData[0].restId){
                    localStorage.removeItem('cart');
                    setCartData([cartItem])
                    cartItem.quantity =1
                    localStorage.setItem('cart',JSON.stringify([cartItem]))
                    setItemCount(1)
                }else{
                    let localStorageCart=cartData
                    cartItem.quantity =1
                    localStorageCart.push(JSON.parse(JSON.stringify(cartItem)))
                    setCartData(localStorageCart)
                    localStorage.setItem('cart',JSON.stringify(localStorageCart))
                    setItemCount(itemCount+1)
                }
            }else{
                setItemCount(1)
                setCartData([cartItem])
                cartItem.quantity =1
                localStorage.setItem('cart',JSON.stringify([cartItem]))
            }
        }
    },[cartItem])


    useEffect(()=>{
        if(removeItem){
            let localDataFilter = cartData.filter((item)=>{
                return item.foodId !==removeItem
            })
            setCartData(localDataFilter)
            setItemCount(itemCount-1)
            localStorage.setItem('cart',JSON.stringify(localDataFilter))
            if(localDataFilter.length==0){
                localStorage.removeItem('cart')
            }
        }
    },[removeItem])


    if (loading) return <p></p>
    if (error) return <p>Error: {error}</p>

    return (
        <header className=" py-2 xl:py-2 w-full bg-[#222021]" >
            <div className="container mx-auto flex justify-between items-center">
                <div className="gap-4 flex justify-between items-center">
                    <div>
                        <Link href="/">
                            <h2 className="text-white font-bold text-3xl uppercase italic">
                                Zomo <span className="text-orange-400">.</span>
                            </h2>
                        </Link>
                    </div>
                    {loginData ? <Location/> : '' }
                </div>
                {loginData ?
                    ''
                : 
                    <div className='' >
                        <ul className="inline-flex gap-4 text-white">
                            <li>
                                <Link href="/customer/signup">Customer SignUp</Link>
                            </li>
                            <li>
                                <Link href="/food_partner/signup">Resturant SignUp</Link>
                            </li>
                            <li>
                                <Link href="/delivery_partner/signup">Delivery Partner SignUp</Link>
                            </li>
                        </ul>
                    </div>
                }    

               

                {loginData ?     
                <div className="hidden xl:block">
                    <div className="flex justify-between items-center gap-5">
                            {loginData ? 
                            <div>
                                <ul className="inline-flex gap-4 text-white">
                                    <li>
                                        <Link href="/food_partner/dashboard">DashBoard</Link>
                                    </li>
                                </ul>
                            </div> 
                        : 
                            ''
                        }
                        <div className="flex static relative">
                            <FaShoppingCart className="text-white text-1" /> 
                            <span 
                            className="
                            absolute 
                            bg-orange-400 
                            rounded-full 
                            w-4 
                            h-4 
                            text-xs 
                            text-center 
                            right-[-7px] 
                            top-[-8px]">
                                {itemCount?itemCount:0}
                            </span>
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
                                    <li className="font-normal text-sm hover:text-orange-400 p-1" onClick={logout}><Link href="#">LogOut</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                : '' }
                
            </div>
        </header>
    );
}

export default memo(Header);