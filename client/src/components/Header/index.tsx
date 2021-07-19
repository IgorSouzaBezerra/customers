import Avatar from "react-avatar";

import { Container, Content, AvatarContent } from "./styles";
import logImg from "../../assets/logo.png";

function Header() {
  return (
    <Container>
      <Content>
        <img src={logImg} alt="logo" />
        <AvatarContent>
          <Avatar round={true} size="50" textSizeRatio={3} name="Igor Bezerra" />
          <p>Igor de Souza Bezerra</p>
        </AvatarContent>
      </Content>
    </Container>
  );
}

export { Header };