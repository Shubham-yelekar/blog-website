import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
interface AuthLayoutProps {
  children: React.ReactNode;
  isProtected: boolean;
}
import type { RootState } from "../state/store";

const AuthLayout = ({ children, isProtected = true }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  useEffect(() => {
    if (authStatus === null) return;
    const shouldLogin = isProtected && !authStatus;
    const shouldgotohome = !isProtected && authStatus;

    if (shouldLogin) {
      navigate("/login");
    } else if (shouldgotohome) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, isProtected]);

  return loader ? <h1>Loading</h1> : <>{children}</>;
};

export default AuthLayout;
