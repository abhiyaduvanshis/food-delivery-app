import Footer from "@/_components/Footer";
import Header from "@/_components/Header";
import InnerBanner from "@/_components/InnerBanner";
import UserLogin from "@/_components/restaurant/UserLogin";
export default function Login() {

  return (
    <>
    <Header/>
      <InnerBanner headerName='Login'/>
      <section className="w-full bg-white py-4">
        <div className="container">
          <div className="flex gap-3 ">
            <UserLogin/>
          </div>
        </div>
      </section>
    <Footer/>
    </>
  
  );
}
