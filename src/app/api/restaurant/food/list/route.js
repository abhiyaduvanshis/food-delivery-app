import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import FoodModel from "@/model/FoodModel";
import checkUserToken from "@/helpers/checkUserToken";

await dbConnect()

export async function GET(request) {

    try {

        const userid = await checkUserToken(request)
        
        const getFoodItem = await FoodModel.find({createdBy:userid})

        if(!getFoodItem){
            return NextResponse.json(
                {
                    success:false,
                    message:"Data not found"
                },
                {
                    status:401
                }
            )
        }else{
            return NextResponse.json(
                {
                    success:true,
                    message:"Data found",
                    result:getFoodItem
                },
                {
                    status:200
                }
            )
        }
        
    } catch (error) {

        return NextResponse.json(
            {
                success:false,
                message:error
            },
            {
                status:401
            }
        )
    }

    
}