'use client'
import { useEffect } from "react";
import io from 'socket.io-client';

const page=()=>{

    const socket = io("http://localhost:5000")

    useEffect(() => {
        socket.emit('new_user', '1');
        localStorage.removeItem('cart');
    }, []);

    return (
        <>
    
        <section className="py-10 xl:py-10 w-full">
            <div className="container">
                <div className="success-container text-center">
                    <div className="flex justify-center items-center">
                        <img 
                        src="/assets/images/success.gif"
                        className="w-28 items-center"
                        />
                    </div>
                    <h1 className="mt-4">Payment Successful</h1>
                    <p className="mt-2"> Thank you for your payment! Your transaction was completed successfully.</p>
                    <div className="pt-10">
                        <a href="/" className="
                            border 
                            border-green-400    
                            py-1    
                            px-4    
                            rounded-md    
                            text-white   
                            font-semibold    
                            text-md  
                            bg-green-400  
                        ">Return to Home</a>
                    </div>
                </div>
            </div>
        </section>
         
        </>
    );
}

export default page;