"use client"
import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import InnerBanner from "@/_components/InnerBanner";
import Register from "@/_components/restaurant/Register";
import { useState } from "react";

export default function Signup() {

  const [roleType,setRoleType] = useState(3)
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
  