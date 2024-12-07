"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/firebaseauth";
import { useRouter } from "next/navigation";
import { authContextType } from "@/types/types";

const AuthContext = createContext<authContextType | null>(null);

type authUserType = {
  email: string | null;
  uid: string;
};

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authenticatedUser, setAuthenticatedUser] = useState<authUserType | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("authenticatedUser");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const authUser: authUserType = {
          email: user.email,
          uid: user.uid,
        };

        setAuthenticatedUser(authUser);
        localStorage.setItem("authenticatedUser", JSON.stringify(authUser));

        if (!user.emailVerified) {
          router.push("/verify");
          if (!emailVerificationSent) {
            sendEmailVerification(user)
              .then(() => setEmailVerificationSent(true))
              .catch((error) => console.error("Error sending verification email", error));
          }
        } else {
          router.push("/profile");
        }
      } else {
        setAuthenticatedUser(null);
        localStorage.removeItem("authenticatedUser");
        router.push("/");
        setEmailVerificationSent(false);
      }
    });

    return () => unsubscribe();
  }, [emailVerificationSent, router]);

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
