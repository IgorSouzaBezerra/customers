import { Form } from "../../../components/Form";
import { Header } from "../../../components/Header";
import { HeaderPage } from "../../../components/HeaderPage";

export function CreateCustomer() {
  return (
    <>
      <Header />
      <HeaderPage title="Criar cliente" />
      <Form type="create" />
    </>
  );
}
