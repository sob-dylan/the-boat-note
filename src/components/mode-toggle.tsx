"use client"

import * as React from "react"
import { MoonStar, LucideSun } from "lucide-react" 
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config"
type ModeToggleProps = {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  text?: string
}

export function ModeToggle(props:ModeToggleProps) {
  const { setTheme } = useTheme()
  const {size, text} = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size}>
          <LucideSun className="h-[1.2rem] w-[1.2rem] rotate-0 text-left scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
