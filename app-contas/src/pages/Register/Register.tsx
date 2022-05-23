import { useEffect, useRef, useState } from "react";
import api from "./../../services/Api";
import { useNavigate } from "react-router-dom";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import "./Register.css";
import toast from "react-hot-toast";

const initialValues = {
  nome: "",
  email: "",
  senha: "",
  perfil_id: "",
};

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const refUsers = useRef([]);

  useEffect(() => {
    //Request users
    api
      .get("/usuarios")
      .then((response) => {
        refUsers.current = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Saved changes
  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  //Submit user
  function handleSubmit(event: any) {
    event.preventDefault();

    for (let i = 0; i < refUsers.current.length; i++) {
      if (refUsers.current[i].email === values.email) {
        toast.error("You have account!");
        navigate("/login");
        return;
      }
    }

    //Usuário criado
    api.post("/usuarios", values);
    toast.success("Conta criada com sucesso");
    navigate('/home');
  }

  return (
    <>
      <div className="containerRegister">
        <div className="headerRegister">
          <img
            src="/favicon.ico"
            alt="icone"
            className="iconC"
            onClick={() => {
              navigate("/register");
            }}
          />

          <div className="ilustracaoContainer">
            <img
              src="/illustration.svg"
              alt="ilustracao"
              className="ilustracao"
            />
          </div>
        </div>

        <div className="bodyRegister">
          <div className="areaRegister">
            <h1>REGISTER</h1>

            <form onSubmit={handleSubmit} className="formRegister">
              <div className="colName">
                <Input
                  name="nome"
                  value={values.nome}
                  label="Name"
                  onChange={handleChange}
                />
              </div>

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
                  name="senha"
                  value={values.senha}
                  label="Password"
                  type="password"
                  onChange={handleChange}
                />
              </div>

              <div className="colProfile">
                <Input
                  name="perfil_id"
                  value={values.perfil_id}
                  label="Profile"
                  type="profile"
                  onChange={handleChange}
                />
              </div>

              <div className="colButton">
                <Button>Send</Button>
              </div>

              <div className="colRegister">
                <p>
                  Do you have an account?
                  <a href="/login">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
