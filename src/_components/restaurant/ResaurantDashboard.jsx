import Link from "next/link";
import { FaEdit,FaTrash } from "react-icons/fa";

const RestaurantDashboard=()=>{

    return (
        <>
            <section className="py-4 xl:py-4 w-full">
                <div className="container">
                    <table className="border-collapse border border-gray-300 w-full text-left">
                        <thead className="bg-gray-300">
                            <tr>
                                <th  className="border border-slate-300 p-2">Item Avilable</th>
                                <th  className="border border-slate-300 p-2">Name</th>
                                <th  className="border border-slate-300 p-2">Image</th>
                                <th  className="border border-slate-300 p-2">Status</th>
                                <th  className="border border-slate-300 p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-slate-300 p-2"><input type="checkbox"></input></td>
                                <td className="border border-slate-300 p-2">Paneer Tikka</td>
                                <td className="border border-slate-300 p-2"><img className="w-20" src="/assets/images/vp-2.png"/></td>
                                <td className="border border-slate-300 p-2"><span className="rounded-full bg-green-400 text-white text-xs px-2 py-1">Avilable</span></td>
                                <td className="border border-slate-300 p-2">
                                    <div className="flex">
                                        <div className="px-2 text-blue-500"><FaEdit/></div> <div className="px-2  text-red-500"><FaTrash/></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 p-2"><input type="checkbox"></input></td>
                                <td className="border border-slate-300 p-2">Paneer Tikka</td>
                                <td className="border border-slate-300 p-2"><img className="w-20" src="/assets/images/vp-2.png"/></td>
                                <td className="border border-slate-300 p-2"><span className="rounded-full bg-red-400 text-white text-xs px-2 py-1">Unavilable</span></td>
                                <td className="border border-slate-300 p-2">
                                    <div className="flex">
                                        <div className="px-2 text-blue-500"><FaEdit/></div> <div className="px-2  text-red-500"><FaTrash/></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 p-2"><input type="checkbox"></input></td>
                                <td className="border border-slate-300 p-2">Paneer Tikka</td>
                                <td className="border border-slate-300 p-2"><img className="w-20" src="/assets/images/vp-2.png"/></td>
                                <td className="border border-slate-300 p-2"><span className="rounded-full bg-green-400 text-white text-xs px-2 py-1">Avilable</span></td>
                                <td className="border border-slate-300 p-2">
                                    <div className="flex">
                                        <div className="px-2 text-blue-500"><FaEdit/></div><div className="px-2  text-red-500"><FaTrash/></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default RestaurantDashboard;