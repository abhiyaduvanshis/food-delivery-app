"use client"
import { useRouter }  from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthService from "../../../services/useAuth";
import {toast } from 'react-toastify';
import LoadingPopup from "../LoadingPopup";

const UserLogin=()=>{

  const router = useRouter()

  const [loading,setLoading] = useState(false)

  const [localStorageToken,setLocalStorageToken]= useState()

    const [formValue,setFormValue] = useState({
      email:'',
      password:''
    })

    useEffect(()=>{
      setLocalStorageToken(localStorage.getItem('accessToken'))
    },[localStorageToken])

    if (localStorageToken) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
    }

    const [validationMessage,setValidationmessage] =useState('')

    const handleChange=(event)=>{
      const {name,value} = event.target
      setFormValue({...formValue,[name]:value})
    }

    const handleSubmit= async (event)=>{
      event.preventDefault()
      const checkValidation = formValidation(formValue)
      if(Object.keys(checkValidation).length===0){
        setLoading(true)
        try {
          const response = await AuthService.RestaurantLogin(formValue)
       
          if(response.data.success===true){
            toast(response.data.message);
            console.log(response.data.userRole)
            if(response.data.userRole===1){
              router.push(`/food_partner/dashboard`)
            }else if(response.data.userRole===2){
              router.push(`/delivery_partner/dashboard`)
            }else{
              router.push(`/`)
            }
          }else{
            toast(response.data.message);
          }
        } catch (error) {
          toast(error.message);
        }
        finally{
          setLoading(false)
        }
      }
    }

    const formValidation = (value)=>{
        const error= {}
        if(!value.email){
          error.email="Email is reqired";
        }
        if(!value.password){
          error.password="Password is reqired";
        }
        setValidationmessage(error)
        return error;
    }


    if(loading){
      return (
        <>
        <LoadingPopup/>
        </>
      )
    }else{
      return (
        <section className="w-full">
          <div className="flex items-center justify-center w-full">
            <div className="lg:w-1/2">
              <div className="p-8 rounded-lg items-center">
                <h1 className="m-2 font-semibold text-3xl">User Login</h1>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      className="w-full rounded-md p-4 text-md bg-gray-100"
                      placeholder="Enter your email*"
                      name="email"
                      type="email"
                      onChange={handleChange}
                    />
           
                    {validationMessage.email ? 
                    (
                    <><span className="text-red-500">{validationMessage.email}</span></>
                    ):(
                    <> </> 
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      className="w-full rounded-md p-4 text-md  bg-gray-100"
                      placeholder="Enter your password*"
                      type="password"
                      name="password"
                      onChange={handleChange}
                    />
                     {validationMessage.password ? 
                    (
                    <><span className="text-red-500">{validationMessage.password}</span></>
                    ):(
                    <> </> 
                    )}
                  </div>
                  <div className="flex justify-center w-full items-center">
                    <button 
                      className="
                      bg-gradient-to-r 
                      from-orange-400 
                      to-red-400  
                      py-3 
                      rounded-md 
                      font-semibold 
                      w-full 
                      text-white"
                      type="submit"
                    >
                    CONTINUE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      );
    }

    
}

export default UserLogin;