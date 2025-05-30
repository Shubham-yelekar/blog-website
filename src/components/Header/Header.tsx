import Button from "../Button";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex items-center py-2 justify-between border-b-[1px] border-[#e6e6e6] bg-white md:px-4 md:py-2">
      <div className="flex items-center gap-1 md:gap-4">
        <Logo className="scale-60 md:scale-80" />
        <span className=" font-bold text-lg text-studio-500 md:text-2xl">
          Studio
        </span>
        <div className="w-[1px] h-8 bg-studio-100"></div>
        <span className=" font-regular text-md text-studio-300 md:text-2xl">
          Blogs
        </span>
      </div>
      <div className="flex gap-1 p-2 md:gap-4">
        <Button className="secondary-btn">Log in</Button>
        <Button className="primary-btn">Sign up</Button>
      </div>
    </header>
  );
};

export default Header;
