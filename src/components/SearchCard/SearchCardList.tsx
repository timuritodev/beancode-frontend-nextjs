import styles from "./style.module.scss";
import { IProduct } from "../../types/Product.types";
import { FC } from "react";
import { SearchCard } from "./SearchCard";

interface SearchCardListProps {
  data: IProduct[];
  isClose: () => void;
  switchPopup: () => void;
}

export const SearchCardList: FC<SearchCardListProps> = ({ data, isClose, switchPopup }) => {
  return (
    <div className={styles.searchcardlist}>
      {data.length !== 0 &&
        data.map((item) => <SearchCard key={item.id} data={item} isClose={isClose} switchPopup={switchPopup} />)}
    </div>
  );
};
