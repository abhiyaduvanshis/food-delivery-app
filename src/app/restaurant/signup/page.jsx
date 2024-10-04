import InnerBanner from "@/_components/InnerBanner";
import Register from "@/_components/restaurant/Register";

export default function Signup() {
    return (
      <>
      <InnerBanner headerName='Create Account'/>
      <section className="w-full bg-white py-4">
        <div className="container">
          <div className="flex gap-3 ">
             <Register/>
          </div>
        </div>
      </section>
    </>
    );
  }
  