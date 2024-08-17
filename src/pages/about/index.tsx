import "./AboutPage.css";

export const AboutPage = () => {
  return (
    <section className="about">
      <div className="about__container">
        <h1 className="about__title">О компании</h1>
        <p className="about__text">
          Наименование организации - ИП Мугерман Роман Борисович
        </p>
        {/* <p className="about__text">
          Юридический адрес - 423826, Республика Татарстан, г. Набережные Челны,
          ул. З.Яруллина, д. 32
        </p> */}
        <p className="about__text">
          Адрес - 423826, Республика Татарстан, г. Набережные Челны,
          проспект Казанский, 226 ст2
        </p>
        <p className="about__text">ИНН - 165036672535</p>
        <p className="about__text">ОГРНИП - 323169000234774</p>
      </div>
    </section>
  );
};
