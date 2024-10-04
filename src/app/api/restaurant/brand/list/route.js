import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import BrandModel from "@/model/BrandModel";
import checkUserToken from "@/helpers/checkUserToken";


await dbConnect()

export async function GET(request) {

    try {

        const userid = await checkUserToken(request)
  
        const getBrandItem = await BrandModel.find()
    
        if(!getBrandItem){
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
                    result:getBrandItem
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
                message:"Something went wrong"
            },
            {
                status:401
            }
        )
    }

    
}