import Link from "next/link";


const RestaurantHeader=()=>{

    return (
        <>
            <section className="py-4 xl:py-4 w-full">
                <div className="container items-center">
                    <ul className="flex group mx-auto mb-4 gap-2 items-center">
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="">Dashboard</Link>
                        </li>
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="">Create Restaurant</Link>
                        </li>
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="/restaurant/food/list">Foods</Link>
                        </li>
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="">View Order</Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default RestaurantHeader;