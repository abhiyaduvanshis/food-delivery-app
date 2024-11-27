import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_END_POINT_URL

const RestaurantLogin= async(postData)=>{
    try {
        const response = await axios.post(API_URL+'restaurant/signIn',postData)
        if(response?.data?.success===true){
            const token = jwtDecode(response.data.accessToken)
            localStorage.setItem('accessToken',response.data.accessToken);
            localStorage.setItem('name',token.user?.name);
            localStorage.setItem('email',token.user?.email);
            localStorage.setItem('id',token.user?.id);
            localStorage.setItem('userRole',token.user?.userRole);
        }
        return response
    } catch (error) {
        return error
    }
}

const RestaurantResgister= async(formData)=>{
    try {
        const response = await axios.post(API_URL+'restaurant/signUp',formData)
        return response
    } catch (error) {
        return error
    }
}

const UserLogOut=async()=>{
 try {
        const response = await axios.delete(API_URL+'logout')
        if(response?.data?.success===true){
            localStorage.clear();
        }
        return response
    } catch (error) {
        return error
    }
    
}

const AuthService = {
    RestaurantLogin,
    RestaurantResgister,
    UserLogOut
}

export default AuthService