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

// export interface IDeliveryData {
//   number: string;
//   comment: string;
//   delivery_recipient_cost: {
//     value: number;
//   };
//   delivery_recipient_cost_adv: [
//     {
//       sum: number; //??
//       threshold: number;
//     }
//   ];
//   from_location: {
//     code: number;
//     fias_guid?: number; //
//     postal_code?: string; //
//     longitude?: number; //
//     latitude?: number; //
//     country_code?: string; //
//     region?: number; //
//     sub_region?: string; //
//     city: string;
//     kladr_code?: string; //
//     address: string;
//   };
//   to_location: {
//     code: number;
//     fias_guid: number; //
//     postal_code: string; //
//     longitude: number; //
//     latitude: number; //
//     country_code: string; //
//     region: number; //
//     sub_region: string; //
//     city: string;
//     kladr_code: string; //
//     address: string;
//   };
//   packages: [
//     {
//       number: string;
//       comment: string;
//       height: number;
//       items: [
//         {
//           ware_key: number;
//           payment: {
//             value: number;
//           };
//           name: string;
//           cost: number;
//           amount: number;
//           weight: number;
//           url: string;
//         }
//       ];
//       length: number;
//       weight: number;
//       width: number;
//     }
//   ];
//   recipient: {
//     name: string;
//     phones: [
//       {
//         number: string;
//       }
//     ];
//   };
//   sender: {
//     name: string;
//   };
//   services: [
//     {
//       code: string;
//     }
//   ];
//   tariff_code: number;
// }

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

// export interface IDeliverData {
//   number: string;
//   tariff_code: string;
//   delivery_recipient_cost: { value: number };
//   threshold: number;
//   sum: number;
//   recipient: {
//     name:string;
//     phones: string;
//   };
//   packages: {
//     number: string;
//     items4: string;//items[]
//     name: string;
//     ware_key: string;
//     payment: string;//money
//     value: number;
//     cost:number;
//     weight: number;
//     amount:number;

//   }
// }

// export interface IDeliverData {
//     number: string;
//     // tariff_code :;
//     shipment_point?: string;
//     delivery_point?: string;
//     value: number;//float;
//     threshold: number;
//     sum: number;//float
//     recipient: string;
//     name: string;
//     phones: string;
//     number2: string;
//     address: string;
//     code: string;
//     packages: string;

// }
