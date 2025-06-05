import Logo from "./Logo";
import SignupBtn from "./SignupBtn";
import type { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const authStatus = useSelector((state: RootState) => state.auth.status);
  const currentUser = useSelector((state: RootState) => state.auth.userData);

  return (
    <header className="flex items-center py-2 justify-between border-b-[1px] border-[#e6e6e6] bg-white md:px-4 md:py-2">
      <Link to={"/"}>
        <div className="flex items-center gap-1 md:gap-4">
          <Logo className="scale-50 sm:scale-80 md:scale-80" />
          <div className="flex flex-col items-start sm:gap-1 sm:flex-row md:gap-4">
            <span className=" font-bold text-sm text-studio-500 md:text-2xl ">
              Studio
            </span>
            <span className=" font-regular text-sm text-studio-300 md:text-2xl">
              Blogs
            </span>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-2 h-full">
        <Link
          className="border-b-2 border-transparent text-studio-450 font-semibold hover:text-studio-800 transition-colors duration-300 transform hover:border-studio-500 mx-1.5 sm:mx-6"
          to={"/all-posts"}
        >
          All Blogs
        </Link>
        {authStatus ? (
          <>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              type="button"
              className="py-3 px-5 rounded-full flex items-center justify-between gap-4 bg-studio-500 transition-all cursor-pointer hover:bg-studio-450"
            >
              <span className="text-studio-50 font-extrabold">
                {currentUser?.name}
              </span>
              <span>
                {menuOpen ? (
                  <ChevronUp className="text-studio-50 " />
                ) : (
                  <ChevronDown className="text-studio-50 " />
                )}
              </span>
            </button>
            {menuOpen && (
              <div className="absolute z-10 w-fit top-20 right-4 bg-white rounded-xl px-4 py-2 flex flex-col gap-4 shadow-[0px_1px_5px_0px_rgba(0,_0,_0,_0.1)]">
                <Link
                  onClick={() => setMenuOpen(false)}
                  className="border-b-2 border-transparent font-semibold text-studio-450 hover:text-studio-800 transition-colors duration-300 transform hover:border-studio-500 "
                  to={"/your-posts"}
                >
                  Your Posts
                </Link>
                <LogoutBtn />
              </div>
            )}
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="border-b-2 border-transparent font-semibold text-studio-450 hover:text-studio-800 transition-colors duration-300 transform hover:border-studio-500 mx-1.5 sm:mx-6"
            >
              Log in
            </Link>
            <SignupBtn />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
