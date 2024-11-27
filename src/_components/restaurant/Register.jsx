'use client'
import { useState } from "react";
import { useRouter }  from "next/navigation";
import Link from "next/link";
import AuthService from "../../../services/useAuth";
import { toast } from "react-toastify";


const Register=({roleType})=>{

  const router = useRouter()

  console.log(roleType)

 

  const [formValue,setFormValue] = useState({
      name:'',
      email:'',
      password:'',
      phone:'',
      city:'',
      address:'',
      userRole:1
  })

  const [message,setMessage] = useState(null)
  const [velidationMessage,setValidationMessage] = useState({})

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormValue({...formValue,[name]:value})
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const formvalidationCheck = validation(formValue)
    if(Object.keys(formvalidationCheck).length === 0){
        const response = await AuthService.RestaurantResgister(formValue)
        if(response.data.success===true){
          toast(response.data.message)
          router.push(`/login`)
        }else{
          toast(response.data.message)
        }
    }
  }

  const validation = (values)=>{
    const error= {}

    if(!values.name){
      error.name='Name is required'
    }

    if(!values.email){
      error.email='Email is required'
    }

    if(!values.password){
      error.password='Password is required'
    }

    if(!values.city){
      error.city='City is required'
    }

    if(!values.address){
      error.address='Address is required'
    }

    setValidationMessage(error)

    return error

  }

    return (
      <section className="w-full">
        <div className="flex items-center justify-center w-full">
          <div className="lg:w-1/2">
            <div className="p-8 rounded-lg items-center">
              <h1 className="m-2 font-semibold text-3xl">Sign up</h1>
              <Link href='/login' className="m-2 font-semibold text-lg ">or <span className="text-orange-400">login to your account</span></Link>
              <form className="mt-4" onSubmit={handleSubmit}>

                <input type="hidden" name="userRole" value={roleType}/>

                <div className="mb-4">
                  <input
                    className="w-full rounded-md p-4 text-md bg-gray-100"
                    placeholder="Enter your name*"
                    name="name"
                    onChange={handleChange}
                  />
                  <span className="text-red-400">{velidationMessage.name}</span>
                </div>
                <div className="mb-4">
                  <input
                    className="w-full rounded-md p-4 text-md bg-gray-100"
                    placeholder="Enter your email*"
                    name="email"
                    onChange={handleChange}
                  />
                   <span className="text-red-400">{velidationMessage.email}</span>
                </div>
                <div className="mb-4">
                  <input
                    className="w-full rounded-md p-4 text-md  bg-gray-100"
                    placeholder="Enter your password*"
                    name="password"
                    onChange={handleChange}
                  />
                   <span className="text-red-400">{velidationMessage.password}</span>
                </div>

                <div className="mb-4">
                  <input
                    className="w-full rounded-md p-4 text-md  bg-gray-100"
                    placeholder="Enter your phone*"
                    name="phone"
                    onChange={handleChange}
                  />
                   <span className="text-red-400">{velidationMessage.phone}</span>
                </div>

                <div className="mb-4">
                  <input
                    className="w-full rounded-md p-4 text-md  bg-gray-100"
                    placeholder="Enter your city*"
                    name="city"
                    onChange={handleChange}
                  />
                   <span className="text-red-400">{velidationMessage.city}</span>
                </div>

                <div className="mb-4">
                  <input
                    className="w-full rounded-md p-4 text-md  bg-gray-100"
                    placeholder="Enter your address*"
                    name="address"
                    onChange={handleChange}
                  />

                   <span className="text-red-400">{velidationMessage.address}</span>
                </div>

                <div className="flex justify-center w-full items-center">
                  <button type="submit" className="bg-gradient-to-r from-orange-400 to-red-400  py-3 rounded-md font-semibold w-full text-white">
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

export default Register;