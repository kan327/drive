"use client"
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const files = useQuery(api.files.getFiles)
  console.log(files);
  
  const createFile = useMutation(api.files.createFile)
  // const session = useSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      <div className="flex flex-col">
      {files?.map((file) => {
        return (
          <div key={file._id}>
            {file.name}
          </div>
        )
      })}
      </div>

      <Button onClick={() => {
        createFile({
          name: 'hello world'
        })
      }}>Click me!</Button>
    </main>
  );
}
