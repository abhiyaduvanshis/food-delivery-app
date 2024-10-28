import {ObjectId } from 'mongodb';
import dbConnect from "@/lib/dbConnect";
import FoodModel from "@/model/FoodModel";
import RestaurantModel from "@/model/RestaurantModel";
import CategoryModel from "@/model/CategoryModel";
import { NextResponse } from "next/server";
import checkUserToken from "@/helpers/checkUserToken";

await dbConnect()

export async function GET(request,{params}) {

    try {

        const {city,rid} = params

        const userid =  checkUserToken(request)

        if(!city){
            return NextResponse.json(
                {
                    success:true,
                    message:"city is required"
                },
                {
                    status:200
                }
            )
        }

        if(!rid){
            return NextResponse.json(
                {
                    success:true,
                    message:"restaurant is required"
                },
                {
                    status:200
                }
            )
        }

        const checkResturant = await RestaurantModel.find({$and:[{_id:rid},{city:city}]})

        if(checkResturant.length===0){
            return NextResponse.json(
                {
                    success:false,
                    message:'Restaurant not avilabile'
                },
                {
                    status:401
                }
            )
        }

        const restId = new ObjectId(rid)

        const getFoodListByResturant = await FoodModel.aggregate([
            {
                $match:{
                    restaurant:restId,
                    available:1
                }
            },
            {
                $group: {
                  _id: "$foodCat", 
                  foodlist : { $push: {
                    name:"$name",
                    description:"$description",
                    image:"$image",
                    price:"$price",
                    offerPrice:"$offerPrice",
                  }}
                }
            },
            
        ])

        if(getFoodListByResturant.length > 0){
            return NextResponse.json(
                {
                    success:true,
                    message:'Food Avilabile',
                    result:getFoodListByResturant
                },
                {
                    status:200
                }
            )
        }else{
            return NextResponse.json(
                {
                    success:false,
                    message:'No Food Avilabile!'
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