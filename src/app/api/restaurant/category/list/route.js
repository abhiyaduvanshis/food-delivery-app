import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import CategoryModel from "@/model/CategoryModel";
import checkUserToken from "@/helpers/checkUserToken";


await dbConnect()

export async function GET(request) {

    try {

        //const catId = params.cid
        //const userid = await checkUserToken(request)
        
        // if(!catId){
        //     return NextResponse.json(
        //         {
        //             success:false,
        //             message:"Data not valid"
        //         },
        //         {
        //             status:401
        //         }
        //     )
        // }

        const getCategoryItem = await CategoryModel.find()
    
        if(!getCategoryItem){
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
                    result:getCategoryItem
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