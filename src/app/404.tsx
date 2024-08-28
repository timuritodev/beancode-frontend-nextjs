import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <section className={styles.notFound}>
      <h1 className={styles.notFound__title}>404</h1>
      <p className={styles.notFound__subtitle}>Страница не найдена</p>
      <button
        className={`${styles.notFound__link}`}
        onClick={() => router.back()}
      >
        Назад
      </button>
      <Link href="/" className={`${styles.loginForm__link} ${styles.loginForm__link_profile} ${styles.notFound__link} ${styles.link}`}>
        На главную
      </Link>
      {/* тут доделать стили */}
    </section>
  );
};

export default NotFoundPage;
