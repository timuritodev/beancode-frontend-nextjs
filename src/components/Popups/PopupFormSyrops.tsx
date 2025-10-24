import { FC, useState } from "react";
import Popup from "./Popup";
import styles from "./style.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch } from "../../services/typeHooks";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { sendEmailApi } from "../../services/redux/slices/mailer/mailer";

interface IChangesSavedPopup {
	isOpened: boolean;
	setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
	selectedSyrup?: string;
}
interface Form {
	fio: string;
	email: string;
	phone: string;
}

export const PopupFormSyrops: FC<IChangesSavedPopup> = ({
	isOpened,
	setIsOpened,
	selectedSyrup,
}) => {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false); // Для отслеживания состояния загрузки
	const [isSent, setIsSent] = useState(false); // Для отслеживания отправки

	const {
		register,
		handleSubmit,
		getValues,
	} = useForm<Form>();

	const onSubmit: SubmitHandler<Form> = () => {
		setIsLoading(true); // Начинаем загрузку
		setIsSent(false); // Сбрасываем статус отправки

		dispatch(
			sendEmailApi({
				email: getValues("email"),
				subject: "Сиропы для кофе",
				text: `Сироп - ${selectedSyrup || "Не указан"} \nФИО - ${getValues("fio")} \nАдрес электронной почты - ${getValues("email")} \nНомер телефона - ${getValues("phone")} \n`,
				greetings: "",
			})
		)
			.unwrap()
			.then(() => {
				setIsLoading(false); // Остановить индикатор загрузки
				setIsSent(true); // Успешно отправлено
				setTimeout(() => setIsOpened(false), 500); // Закрыть попап через 0.5 секунды
			})
			.catch((err) => {
				setIsLoading(false); // Остановить индикатор загрузки
				console.error("dispatch signInUser err:", err);
			});
	};

	return (
		<Popup isOpened={isOpened} setIsOpened={setIsOpened}>
			<div className={styles.popup__container}>
				<button
					type="button"
					className={styles.btn_close}
					onClick={() => setIsOpened(false)}
				></button>
				<h4 className={styles.popup__title}>Заказ сиропа</h4>
				<form
					className={styles.signup__form}
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<CustomInput
						inputType={CustomInputTypes.fio}
						labelText={"ФИО"}
						validation={{
							...register("fio"),
						}}
						placeholder="ФИО"
						error=""
					/>
					<CustomInput
						inputType={CustomInputTypes.phone}
						labelText={"Номер телефона"}
						validation={{
							...register("phone"),
						}}
						placeholder="+7-909-90-90-35"
						error=""
					/>
					<CustomInput
						inputType={CustomInputTypes.email}
						labelText={"Электронная почта"}
						validation={{
							...register("email"),
						}}
						placeholder="email@example.com"
						error=""
					/>
					<CustomButton
						buttonText={isLoading ? "Отправка..." : isSent ? "Отправлено" : "Отправить заказ"}
						handleButtonClick={handleSubmit(onSubmit)}
						disabled={isLoading || isSent}
						type="button"
					/>
				</form>
			</div>
		</Popup>
	);
};
