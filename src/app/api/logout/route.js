import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function DELETE(request) {
    await dbConnect()
    try {
        const response= NextResponse.json(
            {
                success:true,
                message:'User Logout successfully',
            },
            {
                status:200
            }
        )
        response.cookies.set('loginUserData', '', { expires: new Date(0) });
        response.cookies.set('accessToken', '', { expires: new Date(0) });

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

