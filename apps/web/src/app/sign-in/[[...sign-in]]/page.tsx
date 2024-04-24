import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center pt-40">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
