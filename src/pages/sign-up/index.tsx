import { SubmitHandler, useForm } from "react-hook-form";
import "./AuthPage.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch } from "../../services/typeHooks";
import { ISignUpData } from "../../types/Auth.types";
import {
  ADDRESS_VALIDATION_CONFIG,
  AREA_VALIDATION_CONFIG,
  CITY_VALIDATION_CONFIG,
  EMAIL_VALIDATION_CONFIG,
  NAME_VALIDATION_CONFIG,
  PASSWORD_VALIDATION_CONFIG,
  PHONE_VALIDATION_CONFIG,
  SURNAME_VALIDATION_CONFIG,
} from "../../utils/constants";
import {
  signUpUser,
  setUser,
  getUserInfo,
} from "../../services/redux/slices/user/user";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { PopupRegister } from "../../components/Popups/PopupRegister";
import { PopupErrorRegister } from "../../components/Popups/PopupErrorRegister";

export const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<ISignUpData>({ mode: "onChange" });

  const data = {
    name: getValues("name"),
    surname: getValues("surname"),
    phone: getValues("phone"),
    email: getValues("email"),
    address: getValues("address"),
    city: getValues("city"),
    area: getValues("area") === undefined ? "" : getValues("area"),
    password: getValues("password"),
  };

  console.log(data, 222)
  const onSubmit: SubmitHandler<ISignUpData> = () => {
    dispatch(
      signUpUser({
        name: getValues("name"),
        surname: getValues("surname"),
        phone: getValues("phone"),
        email: getValues("email"),
        address: getValues("address"),
        city: getValues("city"),
        area: getValues("area") === undefined ? "" : getValues("area"),
        password: getValues("password"),
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(setUser({ name: data.name, email: data.email, token: res }));
        dispatch(getUserInfo(res));
        setIsSavedPopupOpened(true);
      })
      .catch((err) => {
        setIsErrorPopupOpened(true);
        console.log("dispatch signInUser err:", err);
      });
  };

  useEffect(() => {
    setIsSavedPopupOpened(false);
  }, []);

  return (
    <section className="signup">
      <div className="signup__container">
        <h1 className="signup__title">Регистрация</h1>
        <form
          className="signup__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CustomInput
            inputType={CustomInputTypes.name}
            labelText={"Имя"}
            validation={{
              ...register("name", NAME_VALIDATION_CONFIG),
            }}
            placeholder="Иван"
            error={errors?.name?.message}
          />
          <CustomInput
            inputType={CustomInputTypes.surname}
            labelText={"Фамилия"}
            validation={{
              ...register("surname", SURNAME_VALIDATION_CONFIG),
            }}
            placeholder="Иванов"
            error={errors?.surname?.message}
          />
          <CustomInput
            inputType={CustomInputTypes.phone}
            labelText={"Номер телефона"}
            validation={{
              ...register("phone", PHONE_VALIDATION_CONFIG),
            }}
            placeholder="+7-909-90-90-35"
            error={errors?.phone?.message}
          />
          <CustomInput
            inputType={CustomInputTypes.email}
            labelText={"Электронная почта"}
            validation={{
              ...register("email", EMAIL_VALIDATION_CONFIG),
            }}
            placeholder="email@example.com"
            error={errors?.email?.message}
          />
          <CustomInput
            inputType={CustomInputTypes.address}
            labelText={"Адрес"}
            validation={{
              ...register("address", ADDRESS_VALIDATION_CONFIG),
            }}
            placeholder="ул. Пушкина, д. 9, кв. 192"
            error={errors?.address?.message}
          />
          <CustomInput
            inputType={CustomInputTypes.city}
            labelText={"Город"}
            validation={{
              ...register("city", CITY_VALIDATION_CONFIG),
            }}
            placeholder="Москва"
            error={errors?.city?.message}
          />
          {data.city === "Челны" && (
            <CustomInput
              inputType={CustomInputTypes.area}
              labelText={"Район"}
              validation={{
                ...register("area", AREA_VALIDATION_CONFIG),
              }}
              placeholder="Новый город"
              error={errors?.area?.message}
            />
          )}
          <div>
            <CustomInput
              inputType={CustomInputTypes.password}
              labelText={"Пароль"}
              showPasswordButton={true}
              validation={{
                ...register("password", PASSWORD_VALIDATION_CONFIG),
              }}
              error={errors?.password?.message}
            />
            {/* <span className="input__span input__span_type_password">
              Минимум 8 символов (заглавные и строчные латинские буквы и цифры)
            </span> */}
          </div>
          {/* <CustomInput
                        inputType={CustomInputTypes.repeatPassword}
                        labelText={'Повторите пароль'}
                        validation={{
                            ...register('repeatPassword', {
                                validate: (value) =>
                                    value === watch('password') ||
                                    VALIDATION_SETTINGS.password.messages.noMatch,
                            }),
                        }}
                        error={errors?.repeatPassword?.message}
                    /> */}
          {/* {authError ? (
                                <p className="auth__form-error auth__form-error_type_login">
                                    Почта уже зарегистрирована.
                                </p>
                            ) : null} */}
          <CustomButton
            buttonText={"Зарегистрироваться"}
            handleButtonClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid}
            type="button"
          />
        </form>
      </div>
      <PopupRegister
        isOpened={isSavedPopupOpened}
        setIsOpened={setIsSavedPopupOpened}
      />
      <PopupErrorRegister
        isOpened={isErrorPopupOpened}
        setIsOpened={setIsErrorPopupOpened}
      />
    </section>
  );
};
