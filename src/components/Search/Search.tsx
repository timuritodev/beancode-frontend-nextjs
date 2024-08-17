/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Search.css";
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
    <div className={`search ${isOpenSearch && "search_open"}`}>
      <div className="search__cards" id="search__cards">
        {!isFiltredCards ? (
          <SearchCardList data={filteredCards} isClose={isClose} switchPopup={switchPopup}/>
        ) : (
          <p className="search__card-none">
            По вашему запросу ничего не найдено
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
