'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  if (session) {
    return redirect('/')
  }
  return <div>{children}</div>;
}