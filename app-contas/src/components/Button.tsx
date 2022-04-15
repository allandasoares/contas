import styled from "styled-components";

 const ButtonStyled = styled.button`
  margin-top: 50px;
  margin-left: -30px;
  width: 83px;
  height: 41px;
  background-color: #33ab5f;
  color: #ffffff;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: #4fa071;
  }
`;

function Button(props: any){
  return(
    <>
    <ButtonStyled {...props} ></ButtonStyled>
    </>
  );
}

export default Button;