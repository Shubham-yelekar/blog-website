import React from "react";
import Signup from "../components/Signup";
import { Main } from "../components";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Main>
        <Signup />
      </Main>
    </div>
  );
};

export default SignupPage;
