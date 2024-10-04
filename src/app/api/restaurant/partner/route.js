import dbConnect from "@/lib/dbConnect";
import RestaurantModel from "@/model/RestaurantModel";
import { NextResponse } from "next/server";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";
import { FaCommentsDollar } from "react-icons/fa";

await dbConnect();

export async function POST(request){

    try {
        const userId = await checkUserToken(request)
        const restData= await request.formData()
        const name = restData.get('name')
        const description = restData.get('description')
        const image = restData.get('image')
        const city = restData.get('city')
        const location = restData.get('location')

        if(!name){
            return NextResponse.json(
                {
                    success:false,
                    message:'Restaurant name is required'
                },
                {
                    status:401
                }
            )
        }

        const checkRestName = await RestaurantModel.findOne({name:name})

        if(checkRestName){
            return NextResponse.json(
                {
                    success:false,
                    message:'Restaurant name is already exist'
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
                    message:'Description name is required'
                },
                {
                    status:401
                }
            )
        }

        if(!city){
            return NextResponse.json(
                {
                    success:false,
                    message:'City name is required'
                },
                {
                    status:401
                }
            )
        }

        if(!location){
            return NextResponse.json(
                {
                    success:false,
                    message:'Location is required'
                },
                {
                    status:401
                }
            )
        }

        
        if(!image){
            return NextResponse.json(
                {
                    success:false,
                    message:'Image is required'
                },
                {
                    status:401
                }
            )
        }

        if(image){
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(`./public/resturant/partner/${image?.name}`, buffer);
        }
        
        const createdDate = new Date()
        const submitData = new RestaurantModel(
            {
                name,
                description,
                image:image?.name,
                city,
                location,
                createdDate:createdDate,
                createdBy:userId,
                userId:userId
            }
        )

        const createData = await submitData.save()

        if(!createData){
            return NextResponse.json(
                {
                    success:false,
                    message:'Data not save'
                },
                {
                    status:401
                }
            )
        }else{
            return NextResponse.json(
                {
                    success:true,
                    message:'Data save successfully',
                },
                {
                    status:200
                }
            )
        }

    }catch (error) {
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


export async function GET(request){
    try {

        const userId = await checkUserToken(request)
        const getPartnerItem = await RestaurantModel.find()
    
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

