import Link from "next/link";


const RestaurantHeader=()=>{

    return (
        <>
            <section className="py-4 xl:py-4 w-full">
                <div className="container items-center">
                    <ul className="flex group mx-auto gap-2 items-center">
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="/food_partner/restaurant/list">Restaurant</Link>
                        </li>
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="/food_partner/restaurant/create">Add Restaurant</Link>
                        </li>
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="/food_partner/food/list">Foods</Link>
                        </li>
                        <li className="py-1 px-2 text-sm border border-s-orange-400 hover:text-orange-400 hover:bg-orange-400 hover:text-white rounded-full">
                            <Link href="/food_partner/food/create">Add Foods</Link>
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