import { Address } from "../infra/typeorm/entities/Address";

export interface IUpdateCustomerDTO {
  id: string;

  name: string;

  surname: string;

  cpf: string;

  email: string;

  phone: string;

  active: boolean;

  type: string;

  end_time: Date;

  day_service: Date;

  address?: Address;
}
