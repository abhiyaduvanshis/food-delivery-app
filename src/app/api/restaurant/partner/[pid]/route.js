import dbConnect from "@/lib/dbConnect";
import RestaurantModel from "@/model/RestaurantModel";
import { NextResponse } from "next/server";
import checkUserToken from "@/helpers/checkUserToken";
import fs from "node:fs/promises";

await dbConnect();

export async function GET(request,{params}){
    try {

        const partnerId= params?.pid

        const userId = await checkUserToken(request)
        
        const getPartnerItem = await RestaurantModel.find({ $and: [ {userId:userId},{_id:partnerId} ] })
    
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

export async function PUT(request,{params}){

    try {
        const partnerId= params?.pid
        const userId = await checkUserToken(request)
        const restData= await request.formData()
        const name = restData.get('name')
        const description = restData.get('description')
        const image = restData.get('image')
        const city = restData.get('city')
        const location = restData.get('location')
        const address = restData.get('address')
        const lat = restData.get('lat')
        const lon = restData.get('lon')
        const status = restData.get('status')
        

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


        const checkRestName = await RestaurantModel.find({$and:[{name:name} ,{userId:{$ne:userId}}]})

        if(checkRestName.length > 0){
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



        if(image){
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(`./public/resturant/partner/${image?.name}`, buffer);
        }



        const createdDate = new Date()
        
        const submitData = await RestaurantModel.findOneAndUpdate({$and:[{_id:partnerId},{userId:userId}]},
            {
                $set:{
                    name,
                    description,
                    image:image?.name,
                    city,
                    location,
                    modifiedDate:createdDate,
                    updatedBy:userId,
                    userId:userId,
                    address,
                    lat,
                    lon,
                    status
                }
            }
            
        )

        if(!submitData){
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
                    message:'Data update successfully',
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


export async function DELETE(request,{params}) {
    try {
        const rid = params.pid
        const userid = await checkUserToken(request)
        console.log(rid)
        if(!rid){
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
        const getRestItem = await RestaurantModel.deleteOne({_id:rid})

        console.log(getRestItem)
        if(!getRestItem){
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
                    message:"Data delete successfully",
                    result:getRestItem
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