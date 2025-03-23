import { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface CustomCheckboxProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: ReactNode;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ checked, onChange, label }) => {
	return (
		<label className={styles.checkbox}>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<span className={styles.checkmark}></span>
			{label}
		</label>
	);
};

export default CustomCheckbox;
