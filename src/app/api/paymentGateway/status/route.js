import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";
import ViewCartModel from "@/model/ViewCartModel";

export async function POST(request) {

    try {
        
        const searchParams = request.nextUrl.searchParams
        const merchantTransactionId = searchParams.get('id')

        //console.log(merchantTransactionId)

        const string = `/pg/v1/status/${process.env.NEXT_PUBLIC_MARCHENTID}/${merchantTransactionId}` + process.env.NEXT_PUBLIC_SALT_KEY

        //console.log(string)
        const sha256 = crypto.createHash('sha256').update(string).digest('hex')

        //console.log(sha256)
        const checksum =  `${sha256}###${process.env.NEXT_PUBLIC_SALT_INDEX}`

        //console.log(checksum)
        

        const options= {
            method:"GET",
            url:`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.NEXT_PUBLIC_MARCHENTID}/${merchantTransactionId}`,
            headers:{
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID" : process.env.NEXT_PUBLIC_MARCHENTID
            }
        }

        //console.log(options)
        
        const response = await axios(options);

        //console.log(response)

        if(response.data.success === true){
            const modefiedData = await ViewCartModel.updateOne(
                { transactionId: response.data.data.merchantTransactionId },
                {
                    $set:{
                        status:2
                    }
                }
            )

            //console.log(modefiedData)
            return NextResponse.redirect('http://localhost:3000/success',{ status:301})
        }else{

            const modefiedData = await ViewCartModel.updateOne(
                { transactionId: response.data.data.merchantTransactionId},
                {
                    $set:{
                        status:3
                    }
                }
            )
            return NextResponse.redirect('http://localhost:3000/failed',{ status:301})
        }

    } catch (error) {
        return NextResponse.json(
            {
                success:false,
                message:"Payment Faildfre"
            },
            {
                status:401
            }
        )
    }
    
}