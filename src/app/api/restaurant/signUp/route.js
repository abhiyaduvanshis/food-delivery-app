import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UserModel from "@/model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request) {
    
    await dbConnect()

    try {

        const formData = await request.json()

        if(!formData.name){
            return NextResponse.json(
                {
                    success:false,
                    message:'Name is requred'
                },
                {
                    status:401
                }
            )
        }

        if(!formData.email){
            return NextResponse.json(
                {
                    success:false,
                    message:'Email is requred'
                },
                {
                    status:401
                }
            )
        }

        const user= await UserModel.findOne({email:formData.email})
   
        if(user){
            return NextResponse.json(
                {
                    success:false,
                    message:'Email already exist'
                },
                {
                    status:401
                }
            )
        }
    
        if(!formData.password){
            return NextResponse.json(
                {
                    success:false,
                    message:'Password is requred'
                },
                {
                    status:401
                }
            )
        }

        // if(!formData.restaurentName){
        //     return NextResponse.json(
        //         {
        //             success:false,
        //             message:'Restaurant Name is requred'
        //         },
        //         {
        //             status:401
        //         }
        //     )
        // }

        if(!formData.phone){
            return NextResponse.json(
                {
                    success:false,
                    message:'Phone is requred'
                },
                {
                    status:401
                }
            )
        }

        if(!formData.city){
            return NextResponse.json(
                {
                    success:false,
                    message:'City is requred'
                },
                {
                    status:401
                }
            )
        }

        if(!formData.address){
            return NextResponse.json(
                {
                    success:false,
                    message:'Address is requred'
                },
                {
                    status:401
                }
            )
        }

        const hashPassword = await bcrypt.hash(formData.password,10)
        const createdDate = new Date();
     
        const userData = new UserModel(
            {
                name:formData.name,
                email:formData.email,
                password:hashPassword,
                phone:formData.phone,
                city:formData.city,
                address:formData.address,
                createdDate:createdDate
            }
        )
        const createUser = await userData.save()
        if(!createUser){
            return NextResponse.json(
                {
                    success:false,
                    message:'Restaurent user not created successfully'
                },
                {
                    status:401
                }
            )
        }else{
            
            return NextResponse.json(
                {
                    success:true,
                    message:'Restaurent user created successfully'
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
                message:error.message
            },
            {
                status:401
            }
        )
    }

    
}