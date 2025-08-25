"use client";
import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Logo from "../logo";
import { Button } from "../ui/button";
import { useScrollTop } from "../../../Hooks/use-scroll-top";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

// Simple Hamburger Icon as component
const HamburgerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const MenuSheet: React.FC = () => {
  const scrolled = useScrollTop(75);
  return (
    <>
      {/* // Hidden on md and above */}
      <div className="flex md:hidden p-4 justify-between items-center ">
        <Logo />
        <div className="fixed top-1 right-1 p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Open menu"
                className="p-2 rounded focus:outline-none focus:ring "
              >
                Menu <HamburgerIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-6">
                <SheetClose asChild>
                  <button className="text-left px-4 py-2 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Login
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button className="text-left px-4 py-2 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Sign Up
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  {/* Replace with actual theme switcher logic */}
                  <button className="text-left px-4 py-2 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Theme
                  </button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {scrolled && (
        <div className="hidden md:flex fixed top-1.5 right-4 z-50 p-4 ">
          <Sheet >
            <SheetTrigger asChild>
              <Button
                aria-label="Open menu"
                className="p-2 rounded focus:outline-none focus:ring-green-500
                "
              >
                Menu <HamburgerIcon />
              </Button>
            </SheetTrigger>
              <div className="flex-col justify-between">
            <SheetContent side="right" className="w-64 flex-col">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex-grow flex-col gap-6 mt-6 ">
                
                <SheetClose asChild>
                  <Link href="/login" className=" block text-left px-4 py-2 mb-4 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Login
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/signup" className=" block text-left px-4 py-2 mb-4 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    Sign Up
                  </Link>
                </SheetClose>
                <div className="block text-left px-4 py-2 mb-4 w-full rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <ModeToggle text="Change Theme"/>
                </div>
                  
              </nav>
              <div className="flex m-4">
                <Link href="/termsandconditions" className="underline m-4">Terms & Conditions</Link>
                
                <Link href="/privacy-policy" className="underline m-4">Privacy Policy</Link>
              </div>
            </SheetContent>
              </div>
        
          </Sheet>
          </div>
      )}
    </>
  );
};

export default MenuSheet;
