import dbConnect from "@/lib/dbConnect";
import BrandModel from "@/model/BrandModel";
import { NextResponse } from "next/server";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";

await dbConnect();

export async function POST(request) {

    try {
        
        const userId = await checkUserToken(request)

        const brandFormData = await request.formData()

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
      
        const brandData = new BrandModel({
            name,
            description,
            image:image?.name,
            createdDate:createdDate,
            createdBy:userId
        })

        const createBrand = await brandData.save()

        if(!createBrand){
            return NextResponse.json(
                {
                    success:false,
                    message:"Brand not created successfully"
                },
                {
                    status:401
                }
            )

        }else{

            return NextResponse.json(
                {
                    success:true,
                    message:"Brand created successfully"
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