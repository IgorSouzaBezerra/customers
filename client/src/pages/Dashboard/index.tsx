import { Box, Button, Text } from "@chakra-ui/react";
import { MdAddCircleOutline } from "react-icons/md";
import { useHistory } from "react-router-dom";

import { Header } from "../../components/Header";
import { Table } from "../../components/Table";

export function Dashboard() {
  const history = useHistory();

  return (
    <>
      <Header />
      <Box
        margin="0 auto"
        maxW={1150}
        display="flex"
        justifyContent="space-between"
      >
        <div />
        <Text fontSize="2xl" >Clientes</Text>
        <Button rightIcon={<MdAddCircleOutline />} colorScheme="facebook" onClick={() => history.push("/create")}>
          Novo
        </Button>
      </Box>
      <Table />
    </>
  );
}