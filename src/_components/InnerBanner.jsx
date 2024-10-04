import { FaHome } from "react-icons/fa";

const InnerBanner=(props)=>{
    return (
        <section className="bg-[url('/assets/images/bg-SYBVHDZT.jpg')] pt-24 pb-12 ">
            <div className="xl:w-1/2 mx-auto text-center">
                <h1 className="text-white text-3xl mb-3 font-semibold">{props.headerName}</h1>
                <div className="items-center">
                    <div className="flex justify-center text-white items-center gap-2">
                        <div><FaHome/> </div>
                        <div>Home / {props.headerName}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InnerBanner;