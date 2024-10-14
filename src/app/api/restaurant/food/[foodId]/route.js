import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import FoodModel from "@/model/FoodModel";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";

await dbConnect()

export async function PUT(request,{params}) {
   

    try {

        const foodId = params.foodId
        
        const userid = await checkUserToken(request)

        const formRequestData = await request.formData()

        const name = formRequestData.get('name')
        const description = formRequestData.get('description')
        const price = formRequestData.get('price')
        const image = formRequestData.get('image')
        const offerPrice = formRequestData.get('offerPrice')
        const available = formRequestData.get('available')
        const foodCat = formRequestData.get('foodCat')

        if(!name){
            return NextResponse.json(
                {
                success:false,
                message:"Food name is required"
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

        if(!price){
            return NextResponse.json(
                {
                    success:false,
                    message:"Food price is required"
                },
                {
                    status:401
                }
            )
        }

        if(image){
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(`./public/resturant/food/${image?.name}`, buffer);
        }
        
        const createdDate = new Date()

        const modefiedData = await FoodModel.findByIdAndUpdate(
            foodId,
            {
                $set:{
                    name,
                    description,
                    price,
                    image:image?.name,
                    offerPrice,
                    available,
                    modefiedDate:createdDate,
                    modefiedBy:userid,
                    foodCat
                }
            }
        )

        if(!modefiedData){
            return NextResponse.json(
                {
                    success:false,
                    message:"Foot not updated successfully"
                },
                {
                    status:401
                }
            )

        }else{

            return NextResponse.json(
                {
                    success:true,
                    message:"Food item updated successfully"
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

        const foodId = params.foodId
        const userid = await checkUserToken(request)

        if(!foodId){
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

        const getFoodItem = await FoodModel.findById({_id:foodId})

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
                    message:"Data not found",
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
                message:"Something went wrong"
            },
            {
                status:401
            }
        )
    }
    
}

export async function DELETE(request,{params}) {

    try {

        const foodId = params.foodId
        const userid = await checkUserToken(request)

        if(!foodId){
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

        const getFoodItem = await FoodModel.deleteOne({_id:foodId})

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
                    message:"Data not found",
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
                message:"Something went wrong"
            },
            {
                status:401
            }
        )
    }
    
}