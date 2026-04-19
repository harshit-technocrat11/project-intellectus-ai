import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={{
          baseTheme: dark,
          variables: { colorPrimary: "#3b82f6" },
        }}
      />
    </div>
  );
}
