import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import FoodModel from "@/model/FoodModel";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";

await dbConnect();

export async function POST(request) {
    
    try {

        const userid =  checkUserToken(request)
            
        const formRequestData = await request.formData()

        const name = formRequestData.get('name')
        const description = formRequestData.get('description')
        const price = formRequestData.get('price')
        const image = formRequestData.get('image')
        const offerPrice = formRequestData.get('offerPrice')
        const available = formRequestData.get('available')
        const foodCat = formRequestData.get('foodCat')
        const restaurant = formRequestData.get('restaurant')

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

        const foodData = new FoodModel({
            restaurant,
            name,
            description,
            price,
            image:image?.name,
            offerPrice,
            available,
            createdDate:createdDate,
            createdBy:userid,
            foodCat
        })

        const createFood = await foodData.save()

        if(!createFood){
            return NextResponse.json(
                {
                    success:false,
                    message:"Foot not created successfully"
                },
                {
                    status:401
                }
            )

        }else{

            return NextResponse.json(
                {
                    success:true,
                    message:"Food item created successfully"
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

