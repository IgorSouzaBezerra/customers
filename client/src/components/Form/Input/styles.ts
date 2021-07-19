import styled from "styled-components";

export const Container = styled.div`

`;

export const Label = styled.label`
  color: var(--text-body);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 12px;
  height: 40px;
  border-radius: 4px;

  border: 1px solid #D7D7D7;
  background: #E7E9EE;

  font-weight: 400;
  font-size: 16px;

  &::placeholder {
    color: var(--text-body);
  }
`;
