import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp
    appearance={{
      variables: {
        colorPrimary: "#673ab7",
      },
    }}
    path="/console/sign-up"
    redirectUrl="/console/pods"
    routing="path"
    signInUrl={`/sign-in`}
  />
);

export default SignUpPage;
