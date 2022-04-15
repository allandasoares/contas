import Button from "../../components/Button";
import Input from "../../components/Input";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../../services/Api";

export const initialValues = {
  email: "",
  password: "",
};

export var userProfile = "";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState<any>(initialValues);
  const res = useRef([]);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        res.current = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    res.current.some((item: any) => {
      if (item.email === values.email && item.password === values.password) {
        userProfile = item.profile;
        navigate("/home");
        return true;
      } else {
        console.log("No :( ");
      }
    });
  }

  return (
    <div className="containerLogin">
      <div className="headerLogin">
        <img src="/ico.ico" alt="icone" className="iconC" />
        {/* <label className="headerAbout">About</label> */}
      </div>

      <div className="ilustracaoContainer">
        <img src="/ilustracao.svg" alt="ilustracao" className="ilustracao" />
      </div>

      <div className="bodyLogin">
        <div className="areaLogin">
          <h1>LOGIN</h1>

          <form onSubmit={handleSubmit} className="formLogin">
            <div className="colEmail">
              <Input
                name="email"
                value={values.email}
                label="E-mail"
                onChange={handleChange}
              />
            </div>

            <div className="colPassword">
              <Input
                name="password"
                value={values.password}
                label="Senha"
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="colButton">
              <Button>Send</Button>
            </div>
          </form>
        </div>

        <br />
        <img src="/wave.svg" alt="ilustracao" className="wave" />
      </div>

      <footer>
        <p className="footer">
          © 2022 - Allanda Soares | Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}

export default Login;
