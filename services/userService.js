import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_END_POINT_URL


const getRestaurentFood= async()=>{
    try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(API_URL+'restaurant/food/list',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}


const userService = {
    getRestaurentFood
}

export default userService