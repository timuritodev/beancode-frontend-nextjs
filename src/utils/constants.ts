// const currentURL = window.location.pathname;

// const apiSuffix = '/api/v1';

// export const API_BASE_URL = window.location.origin + currentURL.substring(0, currentURL.lastIndexOf('/')) + apiSuffix;

// export const API_BASE_URL = "http://localhost:3001/api";

export const API_BASE_URL = "https://beancode.ru/api";

export const hashString = (s: string): number => {
  let h = 0;
  let i = 0;
  const l = s.length;

  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
};

// 

export const getProductCountLabel = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "товар";
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return "товара";
  } else {
    return "товаров";
  }
};

export const orders = [
  // {
  //   id: 1,
  //   number: 221133,
  //   info: "Обжаривается",
  //   delivery: "Доставка ожидается 3 декабря",
  // },
  // {
  //   id: 2,
  //   number: 99880011,
  //   info: "В пути asdss",
  //   delivery: "В пункт вывоза 3 декабря",
  // },
  // { id: 3, number: 77664400, info: "Отменен", delivery: "" },
];

export const VALIDATION_SETTINGS = {
  email: {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    maxLength: 64,
    messages: {
      noEmail: "Необходимо ввести email",
      invalid: "Необходимо ввести email в правильном формате",
      tooLong: "Слишком длинный email",
    },
  },
  password: {
    // pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]+$/,
    // minLength: 8,
    pattern: /^[\s\S]*$/,
    minLength: 1,
    maxLength: 32,
    messages: {
      noPassword: "Необходимо ввести пароль",
      noRepeatPassword: "Необходимо повторно ввести пароль",
      invalid: "Необходимо ввести пароль в правильном формате",
      tooShort: "Слишком короткий пароль",
      tooLong: "Слишком длинный пароль",
      noMatch: "Пароли не совпадают",
    },
  },
  name: {
    pattern: /^[a-zа-яё\s]+$/iu,
    minLength: 2,
    maxLength: 25,
    messages: {
      noName: "Необходимо ввести имя",
      invalid: "Только кириллица или латинские буквы",
      tooLong: "Слишком длинное имя",
    },
  },
  surname: {
    pattern: /^[a-zа-яё\s]+$/iu,
    minLength: 2,
    maxLength: 42,
    messages: {
      noSurname: "Необходимо ввести фамилию",
      invalid: "Только кириллица или латинские буквы",
      tooLong: "Слишком длинная фамилия",
    },
  },
  phone: {
    // pattern: /^[0-9]+$/iu,
    pattern: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/iu,
    minLength: 2,
    maxLength: 42,
    messages: {
      noPhone: "Необходимо ввести номер телефона",
      invalid: "Только цифры",
      tooLong: "Слишком длинный номер телефона",
    },
  },
  address: {
    pattern: /^[a-zа-яё\s\0-9]+$/iu,
    minLength: 2,
    maxLength: 42,
    messages: {
      noAddress: "Необходимо ввести адрес",
      invalid: "Только кириллица или латинские буквы",
      tooLong: "Слишком длинный адрес",
    },
  },
  city: {
    pattern: /^[a-zа-яё\s]+$/iu,
    minLength: 2,
    maxLength: 60,
    messages: {
      noCity: "Необходимо ввести название города",
      invalid: "Только цифры",
      tooLong: "Слишком длинное название города",
    },
  },
  area: {
    pattern: /^[a-zа-яё\s]+$/iu,
    minLength: 2,
    maxLength: 40,
    messages: {
      noArea: "Необходимо ввести район",
      invalid: "Только кириллица или латинские буквы",
      tooLong: "Слишком длинное название района",
    },
  },
  title: {
    pattern: /^[a-zа-яё\s]+$/iu,
    minLength: 2,
    maxLength: 42,
    messages: {
      noTitle: "Необходимо ввести название организации",
      invalid: "Только кириллица или латинские буквы",
      tooLong: "Слишком длинной название",
    },
  },
  inn: {
    pattern: /^[0-9]+$/iu,
    minLength: 8,
    maxLength: 15,
    messages: {
      noInn: "Необходимо ввести ИНН",
      invalid: "Только цифры",
      tooShort: "Слишком короткий ИНН",
      tooLong: "Слишком длинный ИНН",
    },
  },
  fio: {
    pattern: /^[a-zа-яё\s]+$/iu,
    minLength: 2,
    maxLength: 100,
    messages: {
      noFio: "Необходимо ввести ФИО",
      invalid: "Только кириллица или латинские буквы",
      tooLong: "Слишком длинная ФИО",
    },
  },
  promo: {
    pattern: /^[a-zа-яё\s\0-9]+$/iu,
    minLength: 2,
    maxLength: 42,
    messages: {
      noPromo: "Такого промокода не существует",
      invalid: "Такого промокода не существует",
      tooLong: "Слишком длинный промкод",
    },
  },
  consumption: {
    pattern: /^[a-zа-яё\s\0-9]+$/iu,
    minLength: 1,
    maxLength: 42,
    messages: {
      noConsumption: "Необходимо заполнить поле",
      invalid: "Только цифры",
      tooShort: "Слишком коротое поле",
      tooLong: "Слишком длинное поле",
    },
  },
};

export const EMAIL_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.email.messages.noEmail,
  },
  pattern: {
    value: VALIDATION_SETTINGS.email.pattern,
    message: VALIDATION_SETTINGS.email.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.email.maxLength,
    message: VALIDATION_SETTINGS.email.messages.tooLong,
  },
};

export const PASSWORD_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.password.messages.noPassword,
  },
  pattern: {
    value: VALIDATION_SETTINGS.password.pattern,
    message: VALIDATION_SETTINGS.password.messages.invalid,
  },
  minLength: {
    value: VALIDATION_SETTINGS.password.minLength,
    message: VALIDATION_SETTINGS.password.messages.tooShort,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.password.maxLength,
    message: VALIDATION_SETTINGS.password.messages.tooLong,
  },
};

export const NAME_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.name.messages.noName,
  },
  pattern: {
    value: VALIDATION_SETTINGS.name.pattern,
    message: VALIDATION_SETTINGS.name.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.name.maxLength,
    message: VALIDATION_SETTINGS.name.messages.tooLong,
  },
};

export const SURNAME_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.surname.messages.noSurname,
  },
  pattern: {
    value: VALIDATION_SETTINGS.surname.pattern,
    message: VALIDATION_SETTINGS.surname.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.surname.maxLength,
    message: VALIDATION_SETTINGS.surname.messages.tooLong,
  },
};

export const PHONE_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.phone.messages.noPhone,
  },
  pattern: {
    value: VALIDATION_SETTINGS.phone.pattern,
    message: VALIDATION_SETTINGS.phone.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.phone.maxLength,
    message: VALIDATION_SETTINGS.phone.messages.tooLong,
  },
};

export const ADDRESS_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.address.messages.noAddress,
  },
  pattern: {
    value: VALIDATION_SETTINGS.address.pattern,
    message: VALIDATION_SETTINGS.address.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.address.maxLength,
    message: VALIDATION_SETTINGS.address.messages.tooLong,
  },
};

export const CITY_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.city.messages.noCity,
  },
  pattern: {
    value: VALIDATION_SETTINGS.city.pattern,
    message: VALIDATION_SETTINGS.city.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.city.maxLength,
    message: VALIDATION_SETTINGS.city.messages.tooLong,
  },
};

export const AREA_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.area.messages.noArea,
  },
  pattern: {
    value: VALIDATION_SETTINGS.area.pattern,
    message: VALIDATION_SETTINGS.area.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.area.maxLength,
    message: VALIDATION_SETTINGS.area.messages.tooLong,
  },
};

export const TITLE_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.title.messages.noTitle,
  },
  pattern: {
    value: VALIDATION_SETTINGS.title.pattern,
    message: VALIDATION_SETTINGS.title.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.title.maxLength,
    message: VALIDATION_SETTINGS.title.messages.tooLong,
  },
};

export const INN_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.inn.messages.noInn,
  },
  pattern: {
    value: VALIDATION_SETTINGS.inn.pattern,
    message: VALIDATION_SETTINGS.inn.messages.invalid,
  },
  minLength: {
    value: VALIDATION_SETTINGS.inn.minLength,
    message: VALIDATION_SETTINGS.inn.messages.tooShort,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.inn.maxLength,
    message: VALIDATION_SETTINGS.inn.messages.tooLong,
  },
};

export const FIO_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.fio.messages.noFio,
  },
  pattern: {
    value: VALIDATION_SETTINGS.fio.pattern,
    message: VALIDATION_SETTINGS.fio.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.fio.maxLength,
    message: VALIDATION_SETTINGS.fio.messages.tooLong,
  },
};

export const PROMO_VALIDATION_CONFIG = {
  // required: {
  //   value: true,
  //   message: VALIDATION_SETTINGS.promo.messages.noPromo,
  // },
  pattern: {
    value: VALIDATION_SETTINGS.promo.pattern,
    message: VALIDATION_SETTINGS.promo.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.promo.maxLength,
    message: VALIDATION_SETTINGS.promo.messages.tooLong,
  },
};

export const CONSUMPION_VALIDATION_CONFIG = {
  required: {
    value: true,
    message: VALIDATION_SETTINGS.consumption.messages.noConsumption,
  },
  pattern: {
    value: VALIDATION_SETTINGS.consumption.pattern,
    message: VALIDATION_SETTINGS.consumption.messages.invalid,
  },
  maxLength: {
    value: VALIDATION_SETTINGS.consumption.maxLength,
    message: VALIDATION_SETTINGS.consumption.messages.tooLong,
  },
};