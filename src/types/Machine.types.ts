export interface IMachine {
  id: number;
  title: string;
  description: string;
  price: string;
  h_picture: string;
  v_picture: string;
  big_description: string;
}

// create table machine(
//   id int auto_increment primary key,
//   title varchar(100) not null,
//   description varchar(200) not null,
//   price varchar(100) not null,
//   h_picture varchar(150) not null,
//   v_picture varchar(150) not null,
//   big_description varchar(250) not null
// );

// INSERT INTO machine(title, description, price, h_picture, v_picture, big_description)
// VALUES('Тест название 1', 'тестовое описние', '100', 'img', 'img', 'тестовое описание');

export interface IMachineState {
  status: "idle" | "success" | "loading" | "failed";
  error: string | undefined;
  products: Array<IMachine>;
}

export interface IMachinebyIdState {
  status: "idle" | "success" | "loading" | "failed";
  error: string | undefined;
  product: IMachine;
}

export interface IMachinesProp {
  data: IMachine[];
}

export interface IMachineProp {
  data: IMachine;
}
