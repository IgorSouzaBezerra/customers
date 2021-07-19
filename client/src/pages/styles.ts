import styled from "styled-components";

export const ButtonControl = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  margin: 0 auto;
  padding: 0 16px;
  height: 48px;
  background: var(--green);
  color: #fff;
  border-radius: 4px;
  border: 0;
  font-size: 16px;
  transition: filter 0.5s;
  font-weight: 600;

  &:hover {
    filter: brightness(0.9);
  }
`;
