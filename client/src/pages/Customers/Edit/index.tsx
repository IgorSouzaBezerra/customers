import { Form } from "../../../components/Form";
import { Header } from "../../../components/Header";
import { HeaderPage } from "../../../components/HeaderPage";

export function EditCustomer() {
  return (
    <>
      <Header />
      <HeaderPage title="Edição do cliente" />
      <Form disabled={false} />
    </>
  );
}
