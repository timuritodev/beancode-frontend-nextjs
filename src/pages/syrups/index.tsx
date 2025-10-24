import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./style.module.scss";
import first from "../../images/syrops/1.jpg";
// import third from "../../images/syrops/3.jpg";
import fourth from "../../images/syrops/4.jpg";
// import fifth from "../../images/syrops/5.jpg";
import { PopupFormSyrops } from "../../components/Popups/PopupFormSyrops";
import { useRouter } from "next/router";

// Список всех доступных сиропов
const allSyrups = [
	"Dr.Almond - Миндаль",
	"The Nutcracker - Лесной орех",
	"Watermelontini - Арбуз",
	"Melontini - Дыня",
	"Lavande de Lumiere - Лаванда",
	"Sureau Noir - Чёрная бузина",
	"Passion Fruit Ferrari - Маракуйя",
	"Black Currant - Черная смородина с листьями",
	"Cherry Lady - Вишня с виноградной косточкой",
	"Pemberton's Coke - Легендарная кола",
	"Dragon Breath - Копчёные перцы",
	"Double Burn Caramel - Карамель двойного обжига",
	"Double Burn Salted Caramel - Солёная карамель двойного обжига",
	"Apple Power - Яблоко с листьями",
	"Eros Pear Elixir - Груша со специями",
	"Top Gum - Сахарный сироп",
	"Irish Cream - Ирландский крем",
	"Gingerbread - Имбирный пряник",
	"Spice Bazaar - Восточные пряности",
	"Black Barbados - Сахарный тростник с мелассой",
	"Original Maple - Кленовый с каштаном",
	"Eucalyptus & Mint - Эвкалипт и мята",
	"Chinensis Plum - Личи",
	"Raspberry Show - Малина с листьями",
	"Blackberry Magic - Ежевика с листьями",
	"Thai Mango - Манго",
	"Authentic Grenadine - Гренадин — старинный рецепт",
	"Armored Cow - Сгущённое молоко",
	"Solar Energy - Цитрусовый микс",
	"Bourbon Vanilla - Бурбонская ваниль",
	"Choco Bomb - Шоколадный трюфель",
	"Barbarella - Тропический микс",
	"Double Strawberry - Клубника и земляника",
	"Coco.In - Кокос с мякотью",
	"Pineapple Q - Ананас",
	"Butterscotch - Сливочная ириска",
	"Lime Elixir - Лайм",
	"Tundra Berries Elixir - Ягоды Севера",
	"Pistachio - Фисташка",
	"Cashmere Peach - Кашемировый персик",
	"Lemongrass Extass - Лемонграсс",
	"Hemp Halva - Конопляная халва",
	"Tarragon - Эстрагон",
	"Popcorn - Попкорн",
	"Bubble Gum - Бабл гам",
	"Red Orange - Красный апельсин",
	"King Kong - Банан",
	"Plum Hit - Слива",
	"Peanut Butter - Арахисовое масло",
	"Fleur Orchidee - Орхидея",
	"Ginger Tincture - Имбирь",
	"Ceylon Cinnamon - Корица",
	"Siberian Taiga - Еловый",
	"Old Pine Tree - Кедр",
	"Arome de Tabac - Табак-ваниль",
	"Pumpkin Head - Тыква",
	"Seaberry Spirit - Облепиха",
	"Macadamia Von Muller - Макадамия",
	"Joan Da Feijoa - Фейхоа",
	"Incredible Pieplant - Ревень",
	"Patchouli Hypnotique - Пачули",
	"Tonka Phenomenal - Бобы тонка"
];

export const SyrupsPage = () => {
	const router = useRouter();
	const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
	const [selectedSyrup, setSelectedSyrup] = useState<string>("");

	const handleSyrupClick = (syrup: string) => {
		setSelectedSyrup(syrup);
		setIsPopupOpened(true);
		// Убираем изменение URL чтобы страница не прокручивалась наверх
		// router.push({
		// 	query: { ...router.query, title: syrup }
		// });
	};

	return (
		<>
			<Head>
				<title>Сиропы для кофе - Beancode</title>
				<meta
					name="description"
					content="Широкий выбор сиропов для кофе в интернет-магазине Beancode. Фруктовые, ореховые, десертные и экзотические сиропы для создания уникального вкуса вашего кофе."
				/>
				<meta
					name="keywords"
					content="сиропы для кофе, сиропы, кофейные сиропы, фруктовые сиропы, ореховые сиропы, десертные сиропы, Beancode"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://beancode.ru/syrups" />
				<meta
					property="og:title"
					content="Сиропы для кофе - Beancode"
				/>
				<meta
					property="og:description"
					content="Откройте мир вкусов с нашими сиропами для кофе! Более 60 уникальных вкусов от классических до экзотических."
				/>
			</Head>

			<div className={styles.syrups}>
				<div className={styles.syrups__container}>
					<h1 className={styles.syrups__title}>Сиропы для кофе</h1>
					<p className={styles.syrups__subtitle}>
						Более 60 уникальных вкусов для создания идеального кофе
					</p>

					{/* Информационный блок */}
					<div className={styles.syrups__infoBlock}>
						<h2 className={styles.syrups__infoTitle}>Все сиропы доступны для заказа!</h2>
						<p className={styles.syrups__infoText}>
							У нас в наличии более 60 различных сиропов от премиальных производителей.
							Все представленные вкусы доступны для заказа. Свяжитесь с нами для уточнения наличия и оформления заказа.
						</p>
						<div className={styles.syrups__contactInfo}>
							<p>📞 Звоните: <strong>+7 960 061-33-30</strong></p>
							<p>✉️ Пишите: <strong>info@beancode.ru</strong></p>
						</div>
					</div>

					{/* Галерея изображений */}
					<div className={styles.syrups__gallery}>
						<Image
							src={first}
							alt="Dr.Almond - Миндаль"
							width={400}
							height={300}
							className={styles.syrups__galleryImage}
						/>
						{/* <Image
							src={third}
							alt="Коллекция сиропов"
							width={400}
							height={600}
							className={styles.syrups__galleryImage}
						/> */}
						<Image
							src={fourth}
							alt="Коллекция сиропов"
							width={400}
							height={300}
							className={styles.syrups__galleryImage}
						/>
						{/* <Image
							src={fifth}
							alt="Коллекция сиропов"
							width={400}
							height={600}
							className={styles.syrups__galleryImage}
						/> */}
					</div>

					{/* Список всех сиропов */}
					<div className={styles.syrups__list}>
						<h2 className={styles.syrups__listTitle}>Все доступные сиропы:</h2>
						<div className={styles.syrups__listGrid}>
							{allSyrups.map((syrup, index) => (
								<div
									key={index}
									className={styles.syrups__listItem}
									onClick={() => handleSyrupClick(syrup)}
								>
									{syrup}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<PopupFormSyrops
				isOpened={isPopupOpened}
				setIsOpened={setIsPopupOpened}
				selectedSyrup={selectedSyrup}
			/>
		</>
	);
};

export default SyrupsPage;
