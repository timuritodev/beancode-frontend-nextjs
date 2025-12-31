import { FC, ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CookieBanner from "../CookieBanner/CookieBanner";
import ChatWidget from "../ChatWidget/ChatWidget";

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
      <ChatWidget />
    </div>
  );
};

export default Layout;
