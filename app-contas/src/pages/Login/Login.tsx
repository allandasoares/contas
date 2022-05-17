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

function Login() {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
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
        //Save in localstorage
        const userProfile = {
          name: item.name,
          profile: item.profile,
        };
        localStorage.setItem("data", JSON.stringify(userProfile));

        //Redirect to home
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
        <img src="/favicon.ico" alt="icone" className="iconC" onClick={() => {
          navigate("/login");
        }}/>

        {/* <div className="headerAbout">
          <label
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </label>
        </div> */}
      </div>

      {/* <div className="introductionLogin">
        <p>Hello! Welcome to the Contas system</p>
      </div> */}

      <div className="ilustracaoContainer">
        <img src="/illustration.svg" alt="ilustracao" className="ilustracao" />
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

            <div className="colRegister" >
              <p>Don't have an account? Register</p>
            </div>
          </form>
        </div>
      </div>

      {/* <footer>
        <p className="footer">
          © 2022 - ALLANDA SOARES | TODOS OS DIREITOS RESERVADOS
        </p>
      </footer> */}
    </div>
  );
}

export default Login;
