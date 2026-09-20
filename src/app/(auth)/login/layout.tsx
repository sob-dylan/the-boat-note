import Footer from "@/components/landing-page/footer";
import MenuSheet from "@/components/landing-page/menu-sheet";
import Navbar from "@/components/landing-page/navbar";
import React from "react";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100vh] m-0 grid grid-rows-[auto_1fr_auto]">
      <MenuSheet/>
      <Navbar/>
      <main className="">{children}</main>
      <Footer/>


    </div>
  
  );
};

export default LandingPageLayout;