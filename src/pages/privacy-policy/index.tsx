import Head from 'next/head';
import styles from "./index.module.scss";

const PrivacyPolicyPage = () => {
	return (
		<>
			<Head>
				<title>Политика конфиденциальности - Beancode</title>
				<meta
					name="description"
					content="Узнайте, как мы обрабатываем ваши персональные данные на сайте."
				/>
				<meta
					name="keywords"
					content="политика конфиденциальности, защита данных, Beancode"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://beancode.ru/privacy-policy" />
				<meta
					property="og:title"
					content="Политика конфиденциальности - Beancode"
				/>
				<meta
					property="og:description"
					content="Узнайте, как мы обрабатываем ваши персональные данные на сайте."
				/>
				<meta
					property="og:image"
					content="https://beancode.ru/api/images/open_graph.jpeg"
				/>
			</Head>
			<div className={styles.page}>
				<div className={styles.container}>
					<h1 className={styles.title}>Политика конфиденциальности</h1>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>1. Введение</h2>
						<p className={styles.text}>
							Мы, компания <strong>Beancode</strong>, уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные. Эта Политика конфиденциальности объясняет, как мы собираем, используем и защищаем информацию, которую вы предоставляете при использовании нашего сайта <a className={styles.link} href="https://beancode.ru" target="_blank" rel="noopener noreferrer">
								https://beancode.ru
							</a>.
						</p>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>2. Какие данные мы собираем</h2>
						<p className={styles.text}>Мы можем собирать следующие данные:</p>
						<ul className={styles.list}>
							<li>Имя и фамилия;</li>
							<li>Электронная почта;</li>
							<li>Номер телефона;</li>
							<li>Адрес и город;</li>
							<li>Данные учетной записи (логин, пароль);</li>
							<li>Файлы cookie и данные об активности на сайте (например, IP-адрес).</li>
						</ul>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>3. Как мы используем ваши данные</h2>
						<p className={styles.text}>Мы используем ваши данные для следующих целей:</p>
						<ul className={styles.list}>
							<li>Для регистрации и авторизации на сайте;</li>
							<li>Для обработки ваших заказов;</li>
							<li>Для отправки уведомлений и предложений;</li>
							<li>Для улучшения качества наших услуг;</li>
							<li>Для персонализации контента и рекламы.</li>
						</ul>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>4. Передача данных третьим лицам</h2>
						<p className={styles.text}>
							Мы не передаем ваши персональные данные третьим лицам, за исключением случаев, когда это необходимо для выполнения наших обязательств перед вами (например, передача данных курьерским службам или платежным системам).
						</p>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>5. Защита данных</h2>
						<p className={styles.text}>
							Мы принимаем все необходимые меры для защиты ваших данных, включая использование SSL-шифрования, двухфакторной аутентификации и других средств безопасности для защиты от несанкционированного доступа и утечек.
						</p>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>6. Срок хранения данных</h2>
						<p className={styles.text}>
							Ваши данные будут храниться до тех пор, пока у вас есть активная учетная запись или в течение срока, необходимого для выполнения юридических обязательств, в зависимости от типа данных.
						</p>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>7. Права пользователей</h2>
						<p className={styles.text}>Вы имеете следующие права относительно своих персональных данных:</p>
						<ul className={styles.list}>
							<li>Право на доступ к данным;</li>
							<li>Право на изменение или исправление данных;</li>
							<li>Право на удаление данных;</li>
							<li>Право на ограничение обработки данных;</li>
							<li>Право на переносимость данных;</li>
							<li>Право на возражение против обработки данных.</li>
						</ul>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>8. Использование cookies</h2>
						<p className={styles.text}>
							Наш сайт использует cookies для улучшения пользовательского опыта. Вы можете отключить cookies в настройках вашего браузера, но это может повлиять на функциональность сайта.
						</p>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>9. Изменения в политике</h2>
						<p className={styles.text}>
							Мы оставляем за собой право вносить изменения в эту Политику конфиденциальности. Все изменения будут публиковаться на этой странице, а дата последнего обновления будет указана в нижней части страницы.
						</p>
					</section>

					<section className={styles.section}>
						<h2 className={styles.subtitle}>10. Контакты</h2>
						<p className={styles.text}>
							Если у вас есть вопросы или запросы относительно этой Политики конфиденциальности, вы можете связаться с нами по адресу:
						</p>
						<p className={styles.text}>Email: <a className={styles.link} href="mailto:support@bayar.com">info@bayar.com</a></p>
					</section>
				</div>
			</div>
		</>
	);
};

export default PrivacyPolicyPage;
