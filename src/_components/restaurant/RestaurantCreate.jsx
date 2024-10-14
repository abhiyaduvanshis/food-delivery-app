'use client'

import { useState,useEffect } from "react";
import { FaEdit,FaTrash } from "react-icons/fa";
import userService from "../../../services/userService";

const RestaurantCreate=()=>{

    // const [foodList,setFoodList] = useState([])
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);


    return (
        <>
            <section className="py-4 xl:py-4 w-full">
                <div className="container">
                    <table className="border-collapse border border-gray-300 w-full text-left">
                        <tbody>
                            <tr>
                                <td className="border border-slate-300 p-2">Food Name</td>
                                <td className="border border-slate-300 p-2"><input name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the name"/></td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 p-2">Food Description</td>
                                <td className="border border-slate-300 p-2"><input name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the description"/></td>
                            </tr>

                            <tr>
                                <td className="border border-slate-300 p-2">Food Image</td>
                                <td className="border border-slate-300 p-2"><input type="file" name="file" className="w-full" placeholder="Enter the name"/></td>
                            </tr>

                            <tr>
                                <td className="border border-slate-300 p-2">Food Price</td>
                                <td className="border border-slate-300 p-2"><input name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the price"/></td>
                            </tr>

                            <tr>
                                <td className="border border-slate-300 p-2">Food Offer Price</td>
                                <td className="border border-slate-300 p-2"><input name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the offer price"/></td>
                            </tr>

                            <tr>
                                <td className="border border-slate-300 p-2">Food available</td>
                                <td className="border border-slate-300 p-2"><input name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Enter the available"/></td>
                            </tr>

                            <tr>
                                <td className="border border-slate-300 p-2"></td>
                                <td className="border border-slate-300 p-2"><input type="submit" name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Enter the available"/></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </section>

            
        </>
    );
}

export default RestaurantCreate;