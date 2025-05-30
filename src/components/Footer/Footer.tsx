import Button from "../Button";
import Logo from "../Header/Logo";

const Footer = () => {
  return (
    <footer className="bg-studio-700 px-4 py-12">
      <div className="flex flex-col gap-8 md:flex-row md:gap-12 md: justify-between">
        <div>
          <div className="flex items-center gap-1 md:gap-4">
            <Logo className="scale-60 md:scale-80" />
            <span className=" font-bold text-lg text-studio-50 md:text-2xl">
              Studio
            </span>
            <div className="w-[1px] h-8 bg-studio-100"></div>
            <span className=" font-regular text-md text-studio-300 md:text-2xl">
              Blogs
            </span>
          </div>
        </div>
        <div className="flex justify-between max-w-96 md:gap-16">
          <div>
            <h5 className="font-semibold text-studio-50">Explore</h5>
            <ul className="text-studio-200 leading-10 mt-3">
              <li>Blog</li>
              <li>About Us</li>
              <li>About Us</li>
              <li>Contact</li>
              <li>Subscribe</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-studio-50">Topics</h5>
            <ul className="text-studio-200 leading-10 mt-3">
              <li>UI/UX Design</li>
              <li>Frontend Development</li>
              <li>React & TypeScript</li>
              <li>Design Systems</li>
              <li>Workflow & Tools</li>
            </ul>
          </div>
        </div>

        <div
          className="bg-[url(/image-1.webp)] bg-cover 
        bg-left p-4 rounded-2xl flex flex-col justify-between  "
        >
          <h3 className="text-studio-50 font-semibold mb-5">Stay in loop</h3>
          <div>
            <h6 className="text-studio-100 mb-5 ">
              Get the latest posts, tools, and tutorials straight to your inbox.
            </h6>
            <div className="input-wrapper">
              <input
                type="text"
                name="text"
                className="input"
                placeholder="info@gmail.com"
              />

              <Button className="primary-btn">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-studio-400 mt-16 text-sm">
        © 2025 Studio. All rights reserved.Crafted with care and clean code.
      </div>
    </footer>
  );
};

export default Footer;
