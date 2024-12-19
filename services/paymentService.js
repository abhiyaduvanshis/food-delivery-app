import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_END_POINT_URL

const Paymentprocess= async(formvalue)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const response = axios.post(API_URL+'paymentGateway/process',formvalue,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log('error')
        return error
    }
}


const paymentService = {
    Paymentprocess
}

export default paymentService