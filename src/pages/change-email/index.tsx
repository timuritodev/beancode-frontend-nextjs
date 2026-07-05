import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import {
  confirmEmailChange,
  requestEmailChange,
  selectUser,
  setUser,
} from "../../services/redux/slices/user/user";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { checkRuEmailDomain, RU_EMAIL_ERROR_MESSAGE } from "../../utils/ruEmailDomain";
import styles from "./style.module.scss";

const ChangeEmailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  // Токен берём из билета (заблокированный вход) либо из обычной сессии (профиль).
  const [token, setToken] = useState<string>("");
  const [step, setStep] = useState<"email" | "code">("email");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ticket =
      (typeof window !== "undefined" && sessionStorage.getItem("changeEmailToken")) ||
      user.token ||
      "";
    setToken(ticket);
    if (!ticket) {
      router.replace("/sign-in");
    }
  }, [user.token, router]);

  const domainCheck = email.trim().length > 0 ? checkRuEmailDomain(email) : null;
  const emailInvalid = !domainCheck || !domainCheck.ok;

  const handleRequest = () => {
    setError("");
    setInfo("");
    if (emailInvalid) {
      setError(RU_EMAIL_ERROR_MESSAGE);
      return;
    }
    setLoading(true);
    dispatch(requestEmailChange({ data: { email: email.trim() }, token }))
      .unwrap()
      .then(() => {
        setStep("code");
        setInfo(`Код подтверждения отправлен на ${email.trim()}`);
      })
      .catch((err) => {
        setError(err?.message || "Не удалось отправить код. Попробуйте ещё раз.");
      })
      .finally(() => setLoading(false));
  };

  const handleConfirm = () => {
    setError("");
    if (code.trim().length === 0) {
      setError("Введите код из письма");
      return;
    }
    setLoading(true);
    dispatch(confirmEmailChange({ data: { code: code.trim() }, token }))
      .unwrap()
      .then((res) => {
        // Бэкенд вернул полноценный токен — пользователь авторизован.
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("changeEmailToken");
        }
        dispatch(setUser({ ...(res.user || {}), email: res.email, token: res.token }));
        router.replace("/profile");
      })
      .catch((err) => {
        setError(err?.message || "Неверный или просроченный код.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Head>
        <title>Смена электронной почты - Beancode</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.signup}>
        <div className={styles.signup__container}>
          <h1 className={styles.signup__title}>Смена электронной почты</h1>

          <p className={styles.signup__subtitle}>
            По требованиям законодательства РФ используется только российская
            почта (.ru, .su, .рф). Укажите новый адрес — мы пришлём на него код
            подтверждения.
          </p>

          {step === "email" ? (
            <form
              key="email-step"
              className={styles.signup__form}
              onSubmit={(e) => {
                e.preventDefault();
                handleRequest();
              }}
              noValidate
            >
              <CustomInput
                inputType={CustomInputTypes.email}
                labelText="Новая электронная почта"
                defaultValue={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                error={email.trim().length > 0 && emailInvalid ? RU_EMAIL_ERROR_MESSAGE : ""}
              />
              <CustomButton
                buttonText={loading ? "Отправка…" : "Получить код"}
                handleButtonClick={handleRequest}
                disabled={emailInvalid || loading}
                type="button"
              />
            </form>
          ) : (
            <form
              key="code-step"
              className={styles.signup__form}
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirm();
              }}
              noValidate
            >
              <CustomInput
                inputType={CustomInputTypes.text}
                labelText="Код из письма"
                value={code}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value)
                }
              />
              <CustomButton
                buttonText={loading ? "Проверка…" : "Подтвердить"}
                handleButtonClick={handleConfirm}
                disabled={code.trim().length === 0 || loading}
                type="button"
              />
              <button
                type="button"
                className={styles.change_address_button}
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setError("");
                  setInfo("");
                }}
              >
                ← Изменить адрес
              </button>
            </form>
          )}

          {info && <p className={styles.signup__info}>{info}</p>}
          {error && <p className={styles.signup__error}>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ChangeEmailPage;
