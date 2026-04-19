import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        appearance={{
          baseTheme: dark,
          variables: { colorPrimary: "#3b82f6" }, 
        }}
      />
    </div>
  );
}
