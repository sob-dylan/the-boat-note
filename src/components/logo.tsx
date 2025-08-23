import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets:["latin"],
    weight: ['400','600']
})

import React from 'react'

const Logo = () => {
  return (
    <div className="flex md:flex items-center gap-x-2">
        <Image
        src="/logo.svg"
        alt="Boat Notes Logo that looks like a sail boat"
        height = "40"
        width= "40"
        />
        <p className="font-semibold">Boat Note</p>
    </div>
  )
}

export default Logo;