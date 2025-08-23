import Image from "next/image";

import React from 'react'

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl z-[-2]">
        <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
            <Image
            src="/hero-main.svg"
            fill
            unoptimized
            alt="Women on a rocket that looks like a bulb"
            className="object-contain dark:hidden"/>
            <Image
            src="/hero-main-dark.svg"
            fill
            unoptimized
            alt="Women on a rocket that looks like a bulb"
            className="hidden dark:block"/>
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
            <Image
            src="/hero-collab.svg"
            fill
            unoptimized
            alt="two people high-fiving"
            className="dark:hidden"
            />
            <Image
            src="/hero-collab-dark.svg"
            fill
            unoptimized
            alt="two people high-fiving"
            className="hidden dark:block"/>
        </div>
        </div>
    </div>
  )
}

export default Heroes