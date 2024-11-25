import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UserModel from "@/model/UserModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { stringify } from "querystring";

export async function POST(request) {
    
    await dbConnect()

    try {
        
        const {email,password} = await request.json()

        if(!email){

            return NextResponse.json(
                {
                    success:false,
                    message:'Please enter your registered email'
                },
                {
                    status:401
                }
            )
        }

        if(!password){
            return NextResponse.json(
                {
                    success:false,
                    message:'Please enter your password'
                },
                {
                    status:401
                }
            )
        }

        const userCheck = await UserModel.findOne({email:email})

        // console.log(userCheck)

        if(!userCheck){
            return NextResponse.json(
                {
                    success:false,
                    message:'User not found'
                },
                {
                    status:401
                }
            )
        }

        const validPassword = await bcryptjs.compare(password, userCheck.password)

        if(!validPassword){
            return NextResponse.json(
                {
                    success:false,
                    message:'Invalid user login detail'
                },
                {
                    status:401
                }
            )
        }

        const token = jwt.sign(
            {
                user:{
                    id:userCheck._id,
                    email:userCheck.email,
                    name:userCheck.name
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }


        const response= NextResponse.json(
            {
                success:true,
                message:'User Login successfully',
                accessToken:token,
                userRole:userCheck.userRole
            },
            {
                status:200
            }
        )

        const loginUserData = {
            'id':userCheck._id,
            'email':userCheck.email,
            'name':userCheck.name,
        }

        response.cookies.set("loginUserData",JSON.stringify(loginUserData), options)
        response.cookies.set('accessToken',token, options)

        return response

    } catch (error) {

        return NextResponse.json(
            {
                success:false,
                message:error.message
            },
            {
                status:500
            }
        )
    }

}