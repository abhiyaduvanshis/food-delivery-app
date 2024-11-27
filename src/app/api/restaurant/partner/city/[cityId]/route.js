import dbConnect from "@/lib/dbConnect";
import RestaurantModel from "@/model/RestaurantModel";
import { NextResponse } from "next/server";
import checkUserToken from "@/helpers/checkUserToken";

await dbConnect();

export async function GET(request,{params}){
    try {
        const cityName= params?.cityId

        console.log(cityName)
        const userId = await checkUserToken(request)
        
        const getPartnerItem = await RestaurantModel.find({$and:[{userId:userId},{city:cityName}]})
    
        if(!getPartnerItem){
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
                    message:"Data  found",
                    result:getPartnerItem
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
