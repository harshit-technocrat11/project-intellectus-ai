import {useAuth, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";


export const AuthRoute = () => {
    const {isLoaded} = useAuth();

    if (!isLoaded) {
      return (
        <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
          Loading...
        </div>
      );
    }
  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};
