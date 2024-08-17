import "./PackageBlock.css";
import package_photo from "../../images/package.jpg";
import package_block from "../../images/package_block.jpeg";

const PackageBlock = () => {
  return (
    <div className="package">
      <div className="package__container">
        <div className="package__text__container">
          <div className="package__digit-title__container">
            <p className="package__digit">03</p>
            <h2 className="package__title">Процесс дозировки и упаковки</h2>
          </div>
          <p className="package__text">
            Упаковочное оборудование, разработанное и произведенное российской
            компанией, позволяет осуществлять упаковку в высоком темпе с
            точностью до 1 гр.
          </p>
        </div>
        <img className="package__img" src={package_block} alt="image of package"/>
      </div>
    </div>
  );
};

export default PackageBlock;
