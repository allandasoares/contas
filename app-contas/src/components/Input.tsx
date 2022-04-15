import styled from "styled-components";

const InputStyled = styled.input`
  width: 300px;
  outline: 0;
  border-width: 0 0 2px;
  /* border-color: #706f6f; */
  font-size: 18px;
  background-color: transparent;
  &:focus {
    border-color: #3e7e59;
  }
`;

const LabelStyled = styled.label`
  display: block;
`;

function Input(props: any) {
  return (
    <>
      <LabelStyled htmlFor={props.name}>{props.label}</LabelStyled>
      <InputStyled {...props} />
    </>
  );
}

export default Input;
