import styled from "styled-components";

export const Container = styled.div`
  /* background-color: #000; */
  /* color: #FFFF; */
`;

export const Content = styled.div`
  max-width: 1550px;
  margin: 0 auto;
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 120px;
  } 

`;

export const AvatarContent = styled.div`
  display: flex;
  align-items: center;

  padding: 10px;
  border-left: 1px solid #dedfe3;

  p {
    margin-left: 10px;
  }
`;
