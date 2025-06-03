import Button from "../Button";

import { useDispatch } from "react-redux";
import authService from "../../backend/Auth";
import { logout } from "../../state/authSlice";
import { useNavigate } from "react-router";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <Button className="secondary-btn" onClick={logoutHandler}>
      Log out
    </Button>
  );
};

export default LogoutBtn;
