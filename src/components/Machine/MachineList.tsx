import { Machine } from "./Machine";
import { FC } from "react";
import styles from "./style.module.scss"; // Import CSS Module
import { IMachine } from "@/types/Machine.types";

interface MachineListProps {
  data: IMachine[];
}

export const MachineList: FC<MachineListProps> = ({ data }) => {
  return (
    <div className={styles.productlist}>
      {data.length !== 0 &&
        data.map((item) => <Machine key={item.id} data={item} />)}
    </div>
  );
};
