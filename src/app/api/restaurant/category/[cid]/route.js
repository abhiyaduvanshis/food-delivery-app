import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import CategoryModel from "@/model/CategoryModel";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";

await dbConnect()

export async function POST(request,{params}) {
   

    try {

        const catId = params?.cid
        const userid = await checkUserToken(request)

        const formRequestData = await request.formData()

        const name = formRequestData.get('name')
        const description = formRequestData.get('description')
        const image = formRequestData.get('image')

        if(!name){
            return NextResponse.json(
                {
                success:false,
                message:"Category name is required"
            },
            {
                status:401
            }
            )
        }

        if(!description){
            return NextResponse.json(
                {
                success:false,
                message:"Food description is required"
            },
            {
                status:401
            }
            )
        }

        if(image){
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(`./public/resturant/food-category/${image?.name}`, buffer);
        }
        
        const createdDate = new Date()

        const modefiedData = await CategoryModel.findByIdAndUpdate(
            catId,
            {
                $set:{
                    name,
                    description,
                    image:image?.name,
                    modefiedDate:createdDate,
                    modefiedBy:userid
                }
            }
        )

        if(!modefiedData){
            return NextResponse.json(
                {
                    success:false,
                    message:"Category not updated successfully"
                },
                {
                    status:401
                }
            )

        }else{

            return NextResponse.json(
                {
                    success:true,
                    message:"Category item updated successfully"
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

export async function GET(request,{params}) {

    try {

        const catId = params.cid
        const userid = await checkUserToken(request)

        if(!catId){
            return NextResponse.json(
                {
                    success:false,
                    message:"Data not valid"
                },
                {
                    status:401
                }
            )
        }

        const getCategoryItem = await CategoryModel.findById({_id:catId})

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