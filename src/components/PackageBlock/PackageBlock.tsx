import styles from "./style.module.scss"; // Import CSS Module
import package_block from "../../images/package_block.jpeg"; // Image for roast block
import Image from "next/image";

const PackageBlock = () => {
  return (
    <div className={styles.package}>
      <div className={styles.package__container}>
        <div className={styles.package__text__container}>
          <div className={styles.package__digit__title__container}>
            <p className={styles.package__digit}>03</p>
            <h2 className={styles.package__title}>Процесс дозировки и упаковки</h2>
          </div>
          <p className={styles.package__text}>
            Упаковочное оборудование, разработанное и произведенное российской
            компанией, позволяет осуществлять упаковку в высоком темпе с
            точностью до 1 гр.
          </p>
        </div>
        <Image className={styles.package__img} src={package_block} alt="image of package" />
        {/* TODO */}
      </div>
    </div>
  );
};

export default PackageBlock;

