import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Layout.css";

export const Layout: FC = () => {
  const location = useLocation();

  return (
    <div className="layout">
      {/* {location.pathname === "/" ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )} */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
