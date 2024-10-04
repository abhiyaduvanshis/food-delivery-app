
'use client'
import { useEffect, useState,createContext,useContext,useMemo } from "react";

export const AuthenticationContext = createContext(null)

const  AuthenticationProvider = ({ children }) =>{
    const [loginData,setloginData]= useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        try {
            const loginUserData = localStorage.getItem('accessToken')
            const name = localStorage.getItem('name')
            const email = localStorage.getItem('email')
            const id = localStorage.getItem('id')
            const userData = {
                'name':name,
                'email':email,
                'id':id
            }
            if(loginUserData){
                setloginData(userData)
            }
        } catch (error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
       
    },[])



    return (
        <AuthenticationContext.Provider value={{loginData,setloginData,loading, error}}>{children}</AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider

export const useAuthenticationContext = () => useContext(AuthenticationContext);

