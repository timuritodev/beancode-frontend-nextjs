import styles from "./style.module.scss";
import Image from "next/image";
import { DeliveryCalculateResponse } from "@/types/Deliver.types";
import { FC } from "react";

interface DeliveryCardProps {
    data: DeliveryCalculateResponse
    image: string
}

export const DeliveryCard: FC<DeliveryCardProps> = ({ data, image }) => {
    return (
        <div className={styles.card}>
            <Image
                className={styles.image}
                src={image}
                alt={`Изображение логотипа доставки`}
                width={142} height={51}
            />
            <div className={styles.date__container}>
                <p className={styles.date}>{data?.period_min} - {data?.period_max} рабочих дня</p>
                {/* <p className={styles.date__calendar}>{data.calendar_min} - {data.calendar_max}</p> */}
            </div>
            <p className={styles.price}>{data?.delivery_sum} ₽</p>
        </div>
    );
};

