"use client"
import { useRouter }  from "next/navigation";
import axios from "axios";
import { useState,useEffect } from "react";
import { FaMapMarker } from "react-icons/fa";
import AllowLocationPopup from "./AllowLocationPopup";

const Location=()=>{
    const router = useRouter()
    const [userCurrentLocation,setUserCurrentLocation]= useState({
        city:null,
        address:null,
        latitude: null,
        longitude: null,
        error: null
      })

    const [saveLocationData,setsaveLocationData]  = useState({})

    const getCurrentLocation=()=>{
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const locationResponse= await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    const address = locationResponse.data.address.road;
                    const city = locationResponse.data.address.city;
                    setUserCurrentLocation({ ...userCurrentLocation,city,address,latitude, longitude , error: null });

                    const lodationInfo = {
                        'lat':locationResponse.data.lat,
                        'lng': locationResponse.data.lon,
                        'address':locationResponse.data.address.road,
                        'city':locationResponse.data.address.city
                    }
                    localStorage.setItem('userLocation',JSON.stringify(lodationInfo))
                } catch (error) {
                    setUserCurrentLocation({ ...userCurrentLocation, error: "Geolocation not supported" });
                }
            },
            (error) => setUserCurrentLocation({ ...userCurrentLocation, error: error.message })
            );
        }else{
            setUserCurrentLocation({ ...userCurrentLocation, error: "Geolocation not supported" });
        }
    }


    useEffect(() => {
        const storedData = localStorage.getItem('userLocation');
        if (storedData) {
            setsaveLocationData(JSON.parse(storedData));
        }
      }, [userCurrentLocation]); 


    // useEffect(()=>{
    //     const getlocation = getCurrentLocation()
    // },[])  


    return (
        <button 
            className="
            flex 
            bg-gradient-to-r
            from-orange-400
            to-red-400 
            rounded-full 
            pl-4 
            pr-4 
            px-1 
            py-1 
            text-white 
            text-sm 
            gap-1 
            justify-between 
            "
            onClick={getCurrentLocation}
        >

            {saveLocationData.city ? 
            (
                <>{saveLocationData.city}</>
            ):(
                <> 
                <FaMapMarker className="text-sm"/>Location 
                <AllowLocationPopup clickLocation={getCurrentLocation} />
                </> 
            )}

        </button>
    );
}

export default Location;