import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import CategoryModel from "@/model/CategoryModel";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";

await dbConnect();

export async function POST(request) {
    
    try {

        const userid =  checkUserToken(request)
            
        const formRequestData = await request.formData()

        const name = formRequestData.get('name')
        const description = formRequestData.get('description')
        const image = formRequestData.get('image')


        if(!name){
            return NextResponse.json(
                {
                success:false,
                message:"Categery name is required"
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

        const categoryData = new CategoryModel({
            name,
            description,
            image:image?.name,
            createdDate:createdDate,
            createdBy:userid
        })

        const createCategory = await categoryData.save()

        if(!createCategory){
            return NextResponse.json(
                {
                    success:false,
                    message:"Category not created successfully"
                },
                {
                    status:401
                }
            )

        }else{

            return NextResponse.json(
                {
                    success:true,
                    message:"Category created successfully"
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

