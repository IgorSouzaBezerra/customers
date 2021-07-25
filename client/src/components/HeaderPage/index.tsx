import { useHistory } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";

interface IProps {
  title: string;
  returnPageIcon?: boolean;
}

export function HeaderPage({ title, returnPageIcon = true }: IProps) {
  const history = useHistory();
  return (
    <Flex
      maxW={1150}
      margin="0 auto"
      align="center"
      justify="space-between"
      mt={10}
      mb={30}
    >
      {returnPageIcon ? (
        <Flex
          cursor="pointer"
        >
          <IoIosArrowRoundBack onClick={history.goBack} size={40} color="#007FFF" />
        </Flex>
      ) : (
      <div />
      )}
      <Text fontSize="2xl">{title}</Text>
      <div />
    </ Flex>
  );
}
