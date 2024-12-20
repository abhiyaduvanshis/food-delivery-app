import dbConnect from "@/lib/dbConnect";
import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";
import checkUserToken from "@/helpers/checkUserToken";
import ViewCartModel from "@/model/ViewCartModel";



export async function POST(request) {

    await dbConnect()
    try {
        
        const userId = await checkUserToken(request)
        const reqData=  await request.json()

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

        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`
        const randomNum = Math.floor(Math.random() * 1e6); // Random number (6 digits)

        let merchantTransactionId=`T${formattedDateTime}${randomNum}`

        const data = {
            merchantId: process.env.NEXT_PUBLIC_MARCHENTID,
            merchantTransactionId: merchantTransactionId,
            name: reqData.name,
            amount: Math.round(reqData.amount*100), // Convert to paise (smallest currency unit)
            redirectUrl: `http://localhost:3000/api/paymentGateway/status?id=${merchantTransactionId}`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:3000/api/paymentGateway/status?id=${merchantTransactionId}`,
            mobileNumber: reqData.mobile,
            paymentInstrument: {
              type: "PAY_PAGE",
            },
        }

        const payload = JSON.stringify(data)
        const payloadMain = Buffer.from(payload).toString('base64')
        const string = payloadMain + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY
        const sha256 = crypto.createHash("sha256").update(string).digest("hex")
        const checksum = `${sha256}###${process.env.NEXT_PUBLIC_SALT_INDEX}`

        const options= {
            method:"POST",
            url:process.env.NEXT_PUBLIC_UAT_PAY_API_URL,
            headers:{
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data:{
                request: payloadMain,
            },
        }

        const response = await axios(options);

        const createdDate = new Date()

        if(response.data.success===true){

            const data =  new ViewCartModel(
                {
                userId:reqData.userId,
                restId:reqData.restId,
                cartData:reqData.cartData,
                price:reqData.amount,
                address:reqData.address,
                transactionId:merchantTransactionId,
                status:1,
                createdDate:createdDate
                }
            )

            const saveViewCart = await data.save()

        }

        return NextResponse.json(response.data);

    } catch (error) {

        return NextResponse.json(
            {
                success:false,
                message:"Payment Faild"
            },
            {
                status:401
            }
        )
        
    }
}