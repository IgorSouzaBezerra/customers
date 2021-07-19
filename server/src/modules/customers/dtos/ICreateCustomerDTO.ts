import { Address } from "../infra/typeorm/entities/Address";

export interface ICreateCustomerDTO {
  name: string;

  surname: string;

  cpf: string;

  email: string;

  phone: string;

  type: string;

  end_time: Date;

  day_service: Date;

  address: Address;

  vehicles: string[];
}
