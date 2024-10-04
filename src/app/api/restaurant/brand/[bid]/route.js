import dbConnect from "@/lib/dbConnect";
import BrandModel from "@/model/BrandModel";
import { NextResponse } from "next/server";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";

await dbConnect();

export async function POST(request,{params}) {

    try {

        brandId = params.bid
        
        userId = await checkUserToken(request)

        const brandFormData = request.formData()

        const name= brandFormData.get('name')
        const description= brandFormData.get('description')
        const image= brandFormData.get('image')

        if(!name){
            return NextResponse.json(
                {
                    success:false,
                    message:"Brand name is required"
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
                    message:"Brand description is required"
                },
                {
                    status:401
                }
            )
        }

        if(image){
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(`./public/resturant/brand/${image?.name}`, buffer);
        }

        const createdDate = new Date()

        const brandData = await BrandModel.findByIdAndUpdate(
            brandId,
            {
                $set:{
                    name,
                    description,
                    image:image?.name,
                    modefiedDate:createdDate,
                    modefiedBy:userId
                }
            }
        )

        if(!brandData){
            return NextResponse.json(
                {
                    success:false,
                    message:"Brand not updated successfully"
                },
                {
                    status:401
                }
            )

        }else{

            return NextResponse.json(
                {
                    success:true,
                    message:"Brand created successfully",
                    result:brandData
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


export async function GET(request,{params}) {

    try {

        const brandId = params.bid
        const userid = await checkUserToken(request)

        if(!brandId){
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

        const getBrandItem = await BrandModel.findById({_id:brandId})

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