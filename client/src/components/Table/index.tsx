import { useState, useCallback, useEffect } from "react";
import { FcSearch } from "react-icons/fc";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { api } from "../../services/api";

import { Container } from "./styles";

interface IType {
  description: string;
}

interface ICustomers {
  id: string;
  name: string;
  surname: string;
  type: IType;
}

function Table() {
  const[customers, setCustomers] = useState<ICustomers[]>([]);

  const loadCustomers = useCallback(async () => {
    const customers = await api.get(`customers`);
    setCustomers(customers.data);
  }, []);

  const removeCustomer = useCallback(async (id: string) => {
    const customersCopy = Array.from(customers);

    await api.delete(`customers/${id}`);

    const index = customers.findIndex(c => c.id === id);
    customersCopy.splice(index, 1);

    setCustomers(customersCopy);
  }, [customers]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]); 

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td><Link to={`/view/${c.id}`}><FcSearch /></Link></td>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.surname}</td>
              <td>{c.type.description}</td>
              <td><IoTrashOutline onClick={() => {removeCustomer(c.id)}} color="#E61919" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export { Table };