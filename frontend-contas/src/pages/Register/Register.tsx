import { useState } from "react";
import api from "./../../services/Api";
import { useNavigate } from "react-router-dom";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import "./Register.css";
import toast from "react-hot-toast";
import { Box, Grid, InputLabel, MenuItem, Paper, Select } from "@material-ui/core";

const initialValues = {
  nome: "",
  email: "",
  senha: "",
  perfil_id: "",
};

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);

  //Saved changes
  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  //Submit user
  function handleSubmit(event: any) {
    event.preventDefault();

    //Criar usuário
    api
      .post("/usuarios", values)
      .then((response) => {
        if (response.data.data) {
          toast.success("Usuário cadastrado com sucesso!");
          navigate("/login");
        } else {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar usuário");
      });
  }

  return (
    <Grid container className="backgroundImage">
      {/* Header */}
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <img
          src="/favicon.ico"
          alt="icone"
          className="iconC"
          onClick={() => {
            navigate("/login");
          }}
        />
      </Grid>

      {/* Body  */}
      <Grid container>
        {/* Ilustration  */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <img
            src="/illustration.svg"
            alt="ilustracao"
            className="ilustracao"
            style={{ width: "90%", objectFit: "fill", marginTop: 200 }}
          />
        </Grid>

        {/* Form  */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: 400,
              height: 540,
              marginLeft: "150px",
            }}
          >
            <Paper
              elevation={1}
              style={{
                width: "inherit",
                height: "inherit",
                background: "#131212",
                justifyContent: "center",
                borderRadius: "18px",
              }}
            >
              <Grid
                container
                style={{
                  justifyContent: "center",
                  color: "#656767",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ textAlign: "center" }}
                >
                  <h1>REGISTER</h1>
                </Grid>

                <form onSubmit={handleSubmit}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ marginTop: "30px" }}
                  >
                    <Input
                      name="nome"
                      value={values.nome}
                      label="Name"
                      onChange={handleChange}
                      style={{ color: "#bbb5b5" }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ marginTop: "30px" }}
                  >
                    <Input
                      name="email"
                      value={values.email}
                      label="E-mail"
                      onChange={handleChange}
                      style={{ color: "#bbb5b5" }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ marginTop: "30px" }}
                  >
                    <Input
                      name="senha"
                      value={values.senha}
                      label="Password"
                      type="password"
                      onChange={handleChange}
                      style={{ color: "#bbb5b5" }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ marginTop: "30px" }}
                  >
                    {/* <Button style={{ background: "#23cc8e" }}>Comum</Button>
                    <Button style={{ background: "#23cc8e", marginLeft: 30 }}>Premium</Button> */}
                    <InputLabel style={{ marginTop: 30, color: "#bbb5b5" }}>Profile</InputLabel>
                    <Select
                      style={{ width: "100%", height: "100%", color: "#bbb5b5" }}
                      label="Profile"
                      name="perfil_id"
                      value={values.perfil_id}
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>Comum</MenuItem>
                      <MenuItem value={2}>Premium</MenuItem>
                    </Select>
                    {/* <Input
                      name="perfil_id"
                      value={values.perfil_id}
                      label="Profile"
                      type="profile"
                      onChange={handleChange}
                      style={{ color: "#bbb5b5" }}
                    /> */}
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ textAlign: "center" }}
                  >
                    <Button onClick={handleSubmit}>Send</Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ textAlign: "center", marginTop: "30px" }}
                  >
                    <p>
                      Don't have an account?
                      <a href="/login" style={{ marginLeft: "1em" }}>
                        Login
                      </a>
                    </p>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;
