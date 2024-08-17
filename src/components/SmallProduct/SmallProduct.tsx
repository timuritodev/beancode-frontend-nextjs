import { IProduct } from "../../types/Product.types";
import "./SmallProduct.css";
import { useAppDispatch } from "../../services/typeHooks";
import { useNavigate } from "react-router";
import { getProductbyidApi } from "../../services/redux/slices/productbyid/productbyid";
import { API_BASE_URL } from "../../utils/constants";

export const SmallProduct = ({ data }: { data: IProduct }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickImage = () => {
    navigate("/product-page");
    dispatch(getProductbyidApi(data.id));
  };

  const imageUrl = API_BASE_URL + data.v_picture;

  return (
    <div className="smallproduct">
      <div className="smallproduct__container">
        <img
          className="smallproduct__image"
          src={imageUrl}
          alt={data.title}
          onClick={handleClickImage}
        />
        <h2 className="smallproduct__title">{data.title}</h2>
        <p className="smallproduct__description">{data.description}</p>
      </div>
    </div>
  );
};
