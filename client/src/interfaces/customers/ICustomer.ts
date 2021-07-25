import { IAddress } from "./IAddress";
import { ITypePerson } from "./ITypePerson";
import { IVehicles } from "./IVehicles";

export interface ICustomer {
  id: string;
  active: boolean;
  name: string;
  surname: string;
  cpf: string;
  email: string;
  phone: string;
  end_time: string;
  day_service: string;
  created_at: string;
  updated_at: string;
  type: ITypePerson;
  address: IAddress;
  vehicles: IVehicles[];
}