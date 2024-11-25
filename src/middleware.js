import { NextResponse } from 'next/server';
import {cookies} from "next/headers";

const secret = process.env.ACCESS_TOKEN_SECRET

export async function middleware(req) {

  const currentUser = cookies().get('accessToken')
  const logedinUserNotAccessPath = req.nextUrl.pathname === '/dashboard/login' 

  if(logedinUserNotAccessPath){
    if(currentUser){
      return NextResponse.redirect(new URL('/', req.url))
    }
  }else{
    if(!currentUser){
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

}

export const config = {
  matcher: ['/','/dashboard/food/:path','/dashboard/restaurant/:path*','/dashboard/food/:path*'],
}