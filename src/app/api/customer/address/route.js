import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import CustomerAddressModel from "@/model/CustomerAddressModel";
import checkUserToken from "@/helpers/checkUserToken";

await dbConnect()

export async function POST(request) {
    try{
        const userId = await checkUserToken(request)
        if(!userId){
            return NextResponse.json(
                {
                    success:false,
                    message:"User not authorized"
                },
                {
                    status:401
                }
            )
        }
        const {address,addressType} = await request.json()
        if(!address){
            return NextResponse.json(
                {
                    success:false,
                    message:"Address field required"
                },
                {
                    status:401
                }
            )
        }
        if(!addressType){
            return NextResponse.json(
                {
                    success:false,
                    message:"Address Type field required"
                },
                {
                    status:401
                }
            )
        }
        const userAddressData = new CustomerAddressModel(
            {
                userId:userId,
                address:address,
                addressType:addressType
            }
        )
        const insertAddressData = await userAddressData.save()
        if(!insertAddressData){
            return NextResponse.json(
                {
                    success:false,
                    message:"Address not save successfully"
                },
                {
                    status:401
                }
            )
        }else{
            return NextResponse.json(
                {
                    success:true,
                    message:"Address save successfully"
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

export async function GET(request) {

    try {

        const userId = await checkUserToken(request)

        if(!userId){
            return NextResponse.json(
                {
                    success:false,
                    message:"User not authorized"
                },
                {
                    status:401
                }
            )
        }

        const getCustomerAddress = await CustomerAddressModel.find({userId:userId})

        if(!getCustomerAddress){
            return NextResponse.json(
                {
                    success:false,
                    message:"Not geting any address of this user"
                },
                {
                    status:200
                }
            )
        }else{
            return NextResponse.json(
                {
                    success:true,
                    message:"Get address successfully",
                    result:getCustomerAddress
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