import { useHistory } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

import { Container } from "./styles";

interface IProps {
  title: string;
  returnPageIcon?: boolean;
}

function Options({ title, returnPageIcon = true }: IProps) {
  const history = useHistory();
  return (
    <Container>
      {returnPageIcon ? (
        <IoIosArrowRoundBack onClick={history.goBack} size={40} color="#007FFF" />
      ) : (
      <div />
      )}
      <h1>{title}</h1>
      <div />
    </ Container>
  );
}

export { Options };