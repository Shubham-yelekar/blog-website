const Footer = () => {
  return (
    <footer className="bg-studio-700 p-12">
      <div className="flex gap-24">
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
      <div>
        © 2025 [Your Company Name]. All rights reserved.Crafted with care and
        clean code.
      </div>
    </footer>
  );
};

export default Footer;
