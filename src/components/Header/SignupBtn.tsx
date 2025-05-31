import { Link } from "react-router";
import Button from "../Button";

const SignupBtn = () => {
  return (
    <Link to={"/signup"}>
      <Button>Sign up</Button>
    </Link>
  );
};

export default SignupBtn;
