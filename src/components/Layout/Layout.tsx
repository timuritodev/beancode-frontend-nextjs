import { FC, ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CookieBanner from "../CookieBanner/CookieBanner";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
