import { useState, useEffect } from "react";
import { PopupCookies } from "../PopupCookies/PopupCookies";

const COOKIE_CONSENT_KEY = "cookie_consent_accepted";

const CookieBanner = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Проверяем, был ли уже дан согласие (только на клиенте)
    if (typeof window !== "undefined") {
      const cookieConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!cookieConsent) {
        // Если согласия нет, показываем попап
        setIsPopupOpen(true);
      }
    }
  }, []);

  const handleAcceptCookies = () => {
    // Сохраняем согласие в localStorage (только на клиенте)
    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    }
    setIsPopupOpen(false);
  };

  return (
    <>
      <PopupCookies
        isPopupOpen={isPopupOpen}
        handleAcceptCookies={handleAcceptCookies}
      />
    </>
  );
};

export default CookieBanner;

