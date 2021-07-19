import { useHistory } from "react-router-dom";

import { Header } from "../components/Header";
import { Options } from "../components/Options";
import { Table } from "../components/Table";

import { ButtonControl, Button } from "./styles";

function Main() {
  const history = useHistory();

  return (
    <>
      <Header />
      <Options title="Clientes" returnPageIcon={false} />
      <ButtonControl>
        <Button onClick={() => {history.push("/create")}}>Adicionar novo Cliente</Button>
      </ButtonControl>
      <Table />
    </>
  );
}

export { Main };