import Button from "../Button";
import { Link } from "react-router";
// Link to the Login page
const LoginBtn = () => {
  return (
    <Link to={"/login"}>
      <Button className="secondary-btn">Login</Button>
    </Link>
  );
};

export default LoginBtn;
