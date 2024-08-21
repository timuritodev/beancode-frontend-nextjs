import styles from "./style.module.scss";
import { useAppSelector } from "../../services/typeHooks";
import { useState, useEffect, FC } from "react";
import { SearchCardList } from "../SearchCard/SearchCardList";

interface SearchProps {
  isOpenSearch: boolean;
  values: string;
  isClose: () => void;
  switchPopup?: any;
}

const Search: FC<SearchProps> = ({ isOpenSearch, values, isClose, switchPopup }) => {
  const cards = useAppSelector((state) => state.products.products);
  const [isFiltredCards, setIsFiltredCards] = useState(false);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(values.toLowerCase())
  );

  useEffect(() => {
    if (filteredCards?.length === 0) {
      setIsFiltredCards(true);
    } else {
      setIsFiltredCards(false);
    }
  }, [filteredCards?.length, values]);

  return (
    <div className={`${styles.search} ${isOpenSearch && styles.search_open}`}>
      <div className={styles.search__cards} id="search__cards">
        {!isFiltredCards ? (
          <SearchCardList data={filteredCards} isClose={isClose} switchPopup={switchPopup}/>
        ) : (
          <p className={styles.search__card_none}>
            По вашему запросу ничего не найдено
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;

