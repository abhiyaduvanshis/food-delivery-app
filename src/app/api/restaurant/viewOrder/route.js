import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import ViewCartModel from "@/model/ViewCartModel";
import checkUserToken from "@/helpers/checkUserToken";
import RestaurantModel from "@/model/RestaurantModel";

await dbConnect()

export async function GET(request) {

    try {

        const userId =  checkUserToken(request)

        if(!userId){
            return NextResponse.json(
                {
                    success:false,
                    message:"User not authorized"
                },
                {
                    status:401
                }
            )
        }

        const getRestaurent = await RestaurantModel.find({userId:userId},{ _id: 1 })


        const getRestId = getRestaurent.map(item => item._id).join(",")

        const getarrayData= getRestId.split(",")

        const getViewCart = await ViewCartModel.find({ restId: { $in: getarrayData } })

        return NextResponse.json(
            {
                success:true,
                message:"View cart found",
                result:getViewCart
            },
            {
                status:200
            }
        )
        
        
    } catch (error) {
        return NextResponse.json(
            {
                success:false,
                message:"Something went wrong"
            },
            {
                status:401
            }
        )
    }

}