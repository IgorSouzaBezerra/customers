export interface ICustomerSend {
  id: string;
  name: string;
  surname: string;
  email: string;
  cpf: string;
  phone: string;
  type: string;
  end_time:string;
  day_service: string;
  zip_code: string;
  district: string;
  street: string;
  state: string;
  number: string;
  city: string;
  vehicles?: string[];
}