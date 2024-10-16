"use client"
import { useRouter }  from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import AuthService from "../../../services/useAuth";
import {toast } from 'react-toastify';

const UserLogin=()=>{

  const router = useRouter()

    const [formValue,setFormValue] = useState({
      email:'',
      password:''
    })

    const [validationMessage,setValidationmessage] =useState('')

    const handleChange=(event)=>{
      const {name,value} = event.target
      setFormValue({...formValue,[name]:value})
    }

    const handleSubmit= async (event)=>{
      event.preventDefault()
      const checkValidation = formValidation(formValue)
      if(Object.keys(checkValidation).length===0){
        try {
          const response = await AuthService.RestaurantLogin(formValue)
          if(response.data.success===true){
            toast(response.data.message);
            router.push(`/dashboard`)
          }else{
            toast(response.data.message);
          }
        } catch (error) {
          toast(error.message);
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

    return (
      <section className="w-full">
        <div className="flex items-center justify-center w-full">
          <div className="lg:w-1/2">
            <div className="p-8 rounded-lg items-center">
              <h1 className="m-2 font-semibold text-3xl">User Login</h1>
              <Link href='/restaurant/signup' className="m-2 font-semibold text-lg ">or <span className="text-orange-400">create an a account</span></Link>
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

export default UserLogin;