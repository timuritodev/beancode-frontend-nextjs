import "./SearchCard.css";
import { FC } from "react";
import { IProduct } from "../../types/Product.types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/typeHooks";
import { getProductbyidApi } from "../../services/redux/slices/productbyid/productbyid";
import { API_BASE_URL } from "../../utils/constants";

export interface SearchCardProps {
  data: IProduct;
  isClose: () => void;
  switchPopup: () => void;
}

export const SearchCard: FC<SearchCardProps> = ({ data, isClose, switchPopup }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate("/product-page");
    dispatch(getProductbyidApi(id));
    isClose();
    switchPopup();
    window.scrollTo(0, 0);
  };

  const imageUrl = API_BASE_URL + data.v_picture;

  return (
    <div
      key={data.id}
      onClick={() => handleClick(data.id)}
      className="search__card"
    >
      <img className="search__card-poster" src={imageUrl} alt={data.title} />
      <article className="search__card-desc">
        <p className="search__card-name">{data.title}</p>
        <div className="search__card-info">
          <p className="search__card-year">{data.low_price} ₽</p>
          <p className="search__card-year">{data.low_weight}</p>
        </div>
      </article>
    </div>
  );
};
