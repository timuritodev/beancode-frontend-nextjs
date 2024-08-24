import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';
import ready_block from '../../images/ready_block.jpeg';
import { useResize } from '../../hooks/useResize';

const ReadyBlock = () => {
  const { width } = useResize();

  return (
    <div className={styles.ready}>
      <div className={styles.ready__container}>
        {width <= 767 ? (
          <>
            <div className={styles.ready__text__container}>
              <div className={styles.ready__digit_title__container}>
                <p className={styles.ready__digit}>04</p>
                <h2 className={styles.ready__title}>Готовая продукция</h2>
              </div>
              <p className={styles.ready__text_special}>
                Производим кофе согласно ГОСТ
              </p>
              <p className={styles.ready__text}>
                Упаковка в пакеты с газоотводящим клапаном и Zip-lock замком
                позволяет нашим потребителям дольше сохранить вкус зерна.
              </p>
              <Link
                href="https://disk.yandex.ru/i/2mZekmtWRv35KQ"
                className={styles.ready__link}
              >
                Документация
              </Link>
              <Image
                className={styles.ready__img}
                src={ready_block}
                alt="image of beans"
                layout="responsive"
                width={600}
                height={400}
              />
            </div>
          </>
        ) : (
          <>
            <p className={styles.ready__digit}>04</p>
            <Image
              className={styles.ready__img}
              src={ready_block}
              alt="image of beans"
              width={393}
              height={281}
            />
            <div className={styles.ready__text__container}>
              <h2 className={styles.ready__title}>Готовая продукция</h2>
              <p className={styles.ready__text_special}>
                Производим кофе согласно ГОСТ
              </p>
              <p className={styles.ready__text}>
                Упаковка в пакеты с газоотводящим клапаном и Zip-lock замком
                позволяет нашим потребителям дольше сохранить вкус зерна.
              </p>
              <Link
                href="https://disk.yandex.ru/i/2mZekmtWRv35KQ"
                className={styles.ready__link}
              >
                Документация
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadyBlock;
