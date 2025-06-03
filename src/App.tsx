import { Outlet } from "react-router";
import "./App.css";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main";
function App() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
