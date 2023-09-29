"use client";

import { cn } from "@/utils/style";
import { Loader } from "lucide-react";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  providers: ClientSafeProvider[];
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { providers } = props;
  const [isLoading] = React.useState<boolean>(false);
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      {providers.map((provider) => (
        <button
          className="h-fit w-fit p-0"
          key={provider.id}
          disabled={isLoading}
          onClick={() => {
            signIn(provider.id);
          }}
        >
          {isLoading ? (
            <Loader className="h-12 w-4 animate-spin" />
          ) : (
            <Image
              className="h-12 hover:opacity-80"
              alt=""
              src={`/images/logo/btn_${provider.id}.png`}
              width={200}
              height={48}
            ></Image>
          )}
        </button>
      ))}
    </div>
  );
}
