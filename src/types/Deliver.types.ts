export interface OrderRegistrationRequest {
  type?: number; // Optional, default is 1 for "internet-store"
  additional_order_types?: number[];
  number?: string; // Max 40 ASCII characters
  tariff_code: number;
  comment?: string; // Max 255 characters
  developer_key?: string;
  shipment_point?: string; // Required if the tariff is "from warehouse"
  delivery_point?: string; // Required if the tariff is "to warehouse" or "to parcel terminal"
  date_invoice?: string; // Required for international orders
  shipper_name?: string; // Required for international orders
  shipper_address?: string; // Required for international orders
  delivery_recipient_cost?: {
    value: number;
    vat_sum?: number;
    vat_rate?: number;
  };
  delivery_recipient_cost_adv?: {
    threshold: number;
    sum: number;
    vat_sum?: number;
    vat_rate?: number;
  }[];
  sender?: {
    company?: string;
    name?: string;
    email?: string;
    passport_series?: string;
    passport_number?: string;
    passport_date_of_issue?: string;
    passport_organization?: string;
    tin?: string;
    passport_date_of_birth?: string;
    phones?: {
      number: string; // International format
      additional?: string;
    }[];
    contragent_type?: string;
  };
  seller?: {
    name?: string; // Required if inn is filled
    inn?: string;
    phone?: string; // Required if inn is filled
    ownership_form?: number; // Required if inn is filled
    address?: string; // Required for international orders
  };
  recipient: {
    company?: string;
    name: string;
    email?: string;
    phones: {
      number: string; // International format
      additional?: string;
    }[];
  };
  from_location?: {
    code: string;
    fias_guid: string;
    postal_code: string;
    longitude: string;
    latitude: string;
    country_code: string;
    region: string;
    sub_region: string;
    city: string;
    kladr_code: string;
    address: string;
  };
  to_location?: {
    code: string;
    fias_guid: string;
    postal_code: string;
    longitude: string;
    latitude: string;
    country_code: string;
    region: string;
    sub_region: string;
    city: string;
    kladr_code: string;
    address: string;
  };
  services?: {
    code: string;
    parameter?: string;
  }[];
  packages: {
    number: string;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    comment?: string;
    items: {
      name: string;
      ware_key: string;
      marking?: string;
      payment?: {
        value: number;
        vat_sum?: number;
        vat_rate?: number;
      };
      cost?: number;
      weight?: number;
      weight_gross?: number;
      amount?: number;
      name_i18n?: string;
      brand_i18n?: string;
      country_code?: string;
      material?: string;
      wifi_gsm?: boolean;
      url?: string;
    }[];
  }[];
  print?: string;
  is_client_return?: boolean;
}

export interface IDeliverDataRes {
  token: string;
  entity: {
    uuid: string;
  };
  requests: {
    request_uuid: string;
    type: string;
    state: string;
    date_time: string;
    errors: [];
    warnings: [];
  }[];
}

export interface IAuthDelivery {
  grant_type: string;
  client_id: string;
  client_secret: string;
}

export interface DeliveryCalculateRequest {
  date?: Date,
  type?: number,
  additional_order_types?: [],
  currency?: number; // Код валюты (ISO 4217)
  tariff_code: number; // Required, тарифный код
  from_location: {
    code?: number; // Код города отправления
    postal_code?: string; // Почтовый индекс города отправления
    country_code?: string; // Код страны (ISO_3166-1_alpha-2)
    city?: string; // Город
    address?: string; // Адрес
  };
  to_location: {
    code?: number; // Код города отправления
    postal_code?: string; // Почтовый индекс города отправления
    country_code?: string; // Код страны (ISO_3166-1_alpha-2)
    city?: string; // Город
    address?: string; // Адрес
  };
  services?: {
    code: string; // Код дополнительной услуги
    parameter?: string; // Параметр услуги
  }[];
  packages: {
    weight: number; // Вес в граммах
    length?: number; // Длина в сантиметрах
    width?: number; // Ширина в сантиметрах
    height?: number; // Высота в сантиметрах
  }[];
}

export interface DeliveryCalculateResponse {
  delivery_sum: number; // Общая сумма доставки
  period_min: number; // Минимальное количество дней доставки
  period_max: number; // Максимальное количество дней доставки
  weight_calc: number,
  calendar_min?: number,
  calendar_max?: number,
  services?: {
    code: string; // Код дополнительной услуги
    sum: number; // Стоимость услуги
    total_sum: number,
    discount_percent: number,
    discount_sum: number,
    vat_rate: number,
    vat_sum: number,
  }[];
  total_sum: number,
  currency: string,
  errors?: {
    code: string; // Код ошибки
    message: string; // Сообщение об ошибке
  }[];
}
