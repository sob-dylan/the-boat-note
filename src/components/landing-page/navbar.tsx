"use client";
import { cn } from "@/lib/utils";
import { useScrollTop } from "../../../Hooks/use-scroll-top";
import Logo from "../logo";
import { ModeToggle } from "../mode-toggle";
import { useState, MouseEventHandler } from "react";
import MenuSheet from "./menu-sheet";
import { Button } from "../ui/button";

// HamburgerIcon props type
interface HamburgerIconProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}




const Navbar: React.FC = () => {
  

  return (
    <div
      className={cn(
        "hidden md:flex border-b shadow-sm dark:bg-[#1f1f1f] bg-background  top-0 items-center w-full p-4 justify-between",

      )}
    >
      <Logo />
      <div className="flex items-center gap-x-2">
        
       {/* <HamburgerIcon onClick={() => setMenu Open(true)} /> */}
        <div className="hidden md:flex items-center gap-x-2">
          <Button variant="ghost" className="mr-[-10px]">Testimonials</Button>
          <Button variant="ghost" className="ml-0">Plans</Button>


          <Button >Login</Button>

          <Button >Sign Up</Button>
          <ModeToggle />

        </div>
      </div>
      {/* <Menu open={menuOpen} onClose={() => setMenuOpen(false)} /> */}
    </div>
  );
};

export default Navbar;
