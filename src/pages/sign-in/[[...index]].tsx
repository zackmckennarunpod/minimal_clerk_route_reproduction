import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  console.log("origin", origin);
  const redirectUrl = `${origin}/pods`;

  return (
    <SignIn
      path="/console/sign-in"
      redirectUrl={redirectUrl}
      routing="path"
      signUpUrl={`/sign-up`}
    />
  );
};

export default SignInPage;
