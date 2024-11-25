"use client"
import { useState } from "react";
import InnerBanner from "@/_components/InnerBanner";
import Register from "@/_components/restaurant/Register";
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";

export default function Signup() {

  const [roleType,setRoleType] = useState(1)
    return (
      <>
        <Header/>
          <InnerBanner headerName='Create Account'/>
          <section className="w-full bg-white py-4">
            <div className="container">
              <div className="flex gap-3 ">
                <Register roleType={roleType}/>
              </div>
            </div>
          </section>
        <Footer/>
    </>
    );
  }
