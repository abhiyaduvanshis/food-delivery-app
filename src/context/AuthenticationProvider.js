
'use client'
import { useEffect, useState,createContext,useContext,useMemo } from "react";

export const AuthenticationContext = createContext(null)

const  AuthenticationProvider = ({ children }) =>{

    const [loginData,setloginData]= useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //const [login,setLogin]=useState(null)

    const login =()=>{
        try {
            const loginUserData = localStorage.getItem('accessToken')
            const name = localStorage.getItem('name')
            const email = localStorage.getItem('email')
            const id = localStorage.getItem('id')
            const userRole = localStorage.getItem('userRole')
            const userData = {
                'name':name,
                'email':email,
                'id':id,
                'userRole':userRole
            }
            if(loginUserData){
                setloginData(userData)
            }
        } catch (error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        login()
    },[])

    const logOut=()=>{
        setloginData(null); 
    }

    return (
        <AuthenticationContext.Provider value={{loginData,loading,error,login,logOut}}>{children}</AuthenticationContext.Provider>
    )

}

export default AuthenticationProvider

export const useAuthenticationContext = () => useContext(AuthenticationContext);

