"use client";

import { UserSession } from "@/types/auth";
import { ReactNode, createContext, useContext, useMemo } from "react";

type AuthContextType = {
  user: UserSession;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
});

interface Props {
  children: ReactNode;
  user: UserSession;
}
export const AuthContextProvider = (props: Props) => {
  const { children, user } = props;
  const value = useMemo<AuthContextType>(() => {
    return { user };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const { user } = useContext(AuthContext);
  return {
    user,
    status: user ? "authenticated" as const : "unauthenticated" as const,
    signIn() {
      window.location.href = "/api/auth/google/login";
    },
    signOut() {
      window.location.href = "/api/auth/google/logout";

    },
  };
}
