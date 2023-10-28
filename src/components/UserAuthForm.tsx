"use client";

import { useAuth } from "@/context/auth";
import { cn } from "@/utils/style";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      <button
        className="h-fit w-fit p-0"
        disabled={isLoading}
        onClick={() => {
          signIn();
        }}
      >
        {isLoading ? (
          <Loader className="h-12 w-4 animate-spin" />
        ) : (
          <Image
            className="h-12 hover:opacity-80"
            alt=""
            src={`/images/logo/btn_google.id}.png`}
            width={200}
            height={48}
          ></Image>
        )}
      </button>
    </div>
  );
}
