import styled from "styled-components";

const ButtonStyled = styled.button`
  margin-top: 50px;
  margin-left: -30px;
  width: 95px;
  height: 40px;
  background-color: #1cd594;
  color: #ffffff;
  border: none;
  border-radius: 40px;
  cursor: pointer;

  &:hover {
    background: #1fe9a2;
  }
`;

function Button(props: any) {
  return (
    <>
      <ButtonStyled {...props}></ButtonStyled>
    </>
  );
}

export default Button;
