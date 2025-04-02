
"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="w-full h-screen ">
        <div className="flex-grow w-full h-full pt-24 flex justify-center items-center">
        <Button onClick={()=>signIn('google')} variant={'ghost'} className=" flex items-center gap-2 justify-center">
            <FaGoogle/> Sign in with google
        </Button>
        </div>
    </div>
  )
}
