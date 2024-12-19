import Footer from "@/_components/Footer";
import Header from "@/_components/Header";


const page=()=>{

    return (
        <>
    
        <section className="py-10 xl:py-10 w-full bg-[#fefcfc] h-dvh">
            <div className="container">
                <div className="success-container text-center">
                    <div className="flex justify-center items-center">
                        <img 
                        src="/assets/images/failed.webp"
                        className="w-28 items-center"
                        />
                    </div>
                    <h1 className="mt-4">Payment Failed</h1>
                    <p className="mt-2">Unfortunately, your payment could not be processed. Please try again or contact support.</p>
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