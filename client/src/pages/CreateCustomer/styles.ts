import styled from "styled-components";

export const Container = styled.form`
  margin: 0 auto;
  width: 30%;
  margin-bottom: 100px;

  background-color: #FFF;
  padding: 20px;
  border-radius: 4px;
`;

export const Label = styled.label`
  color: var(--text-body);
  margin-left: 5px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0 12px;
  height: 40px;
  border-radius: 4px;

  border: 1px solid #D7D7D7;
  background: #E7E9EE;

  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #dedfe3;
  border-radius: 4px;

  
`;

export const Button = styled.button`
  width: 100%;
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
