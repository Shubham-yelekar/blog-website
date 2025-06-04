import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Header/Logo";
import { login as authLogin } from "../state/authSlice";
import authService from "../backend/Auth";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SignupFormData>();
  const [error, setError] = useState<string>("");

  const signup = async (data: SignupFormData) => {
    setError("");
    try {
      const newAccount = await authService.createAccount(data);
      if (newAccount) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(authLogin(currentUser));
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        const fullMessage = error.message;
        const parts = fullMessage.split(":");
        const cleanedMessage =
          parts.length > 1 ? parts.slice(-1)[0].trim() : fullMessage;
        setError(cleanedMessage);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-[-1px_1px_28px_-9px_rgba(0,_0,_0,_0.1)] flex flex-col gap-4 md:gap-2 sm:w-96 ">
      <div className="flex items-center justify-center gap-1 md:gap-4">
        <Logo className="scale-60 md:scale-80" />
        <span className=" font-bold text-lg text-studio-500 md:text-2xl">
          Studio
        </span>
        <div className="w-[1px] h-8 bg-studio-100"></div>
        <span className=" font-regular text-md text-studio-300 md:text-2xl">
          Blogs
        </span>
      </div>
      <h4 className="text-center">Create Account</h4>
      {error && (
        <p className="text-red-600 mt-8 text-center text-xs">{error}</p>
      )}
      <form onSubmit={handleSubmit(signup)}>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            label="Name"
            placeholder="Enter your name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            type={"email"}
            label="Email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  ' "Email address must be a valid address",',
              },
            })}
          />
          <Input
            type={"password"}
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Button
            type="submit"
            style={{ width: "100%" }}
            className="primary-btn"
          >
            Create Account
          </Button>
        </div>
      </form>
      <div className="w-full h-[0.5px] my-2 bg-studio-100"></div>
      <Link to={"/login"}>
        <Button style={{ width: "100%" }} className="secondary-btn">
          Log in
        </Button>
      </Link>
    </div>
  );
};

export default Signup;
