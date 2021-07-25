import { ICustomer } from "../../interfaces/customers/ICustomer";
import { ITypePerson } from "../../interfaces/customers/ITypePerson";
import { api } from "../../services/api";


export async function getCustomer(id: string) {
  const response = await api.get<ICustomer>(`customers/${id}`);
  return response.data;
}

export async function getTypePerson() {
  const response = await api.get<ITypePerson[]>(`types`);
  return response.data;
}
