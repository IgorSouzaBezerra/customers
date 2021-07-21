import { Address } from "../infra/typeorm/entities/Address";
import { Vehicle } from "../infra/typeorm/entities/Vehicle";

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

  vehicles?: Vehicle;
}
