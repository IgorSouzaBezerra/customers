import { ICustomer } from "../../interfaces/customers/ICustomer";
import { ITypePerson } from "../../interfaces/customers/ITypePerson";
import { IState } from "../../interfaces/customers/IState";
import { api } from "../../services/api";
import { ICities } from "../../interfaces/customers/ICities";


export async function getCustomer(id: string) {
  const response = await api.get<ICustomer>(`customers/${id}`);
  return response.data;
}

export async function getTypePerson() {
  const response = await api.get<ITypePerson[]>(`types`);
  return response.data;
}

export async function getIBGEState() {
  const response = await api.get<IState[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);

  const serializedResponse = response.data.map(state => {
    return {
      id: state.sigla,
      description: state.sigla,
    }
  });

  return serializedResponse;
}

export async function getIBGECities(state: string) {
  const response = await api.get<ICities[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`);

  const serializedResponse = response.data.map(city => {
    return {
      id: city.nome,
      description: city.nome,
    }
  });

  return serializedResponse;
}
