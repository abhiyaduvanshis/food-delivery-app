'use client'

import { createContext, useState, useContext,useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationcity, setlocationcity] = useState(null);
    useEffect(() => {
        location()
    }, [])

    const location=()=>{
        const storedData = localStorage.getItem('userLocation');
        if (storedData) {
            setlocationcity(JSON.parse(storedData));
        }
    }
  return (
    <LocationContext.Provider value={{ location,locationcity }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider

export const useLocation = () => useContext(LocationContext);
