import Button from "../../components/Button";
import Input from "../../components/Input";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/Api";
import { toast } from "react-hot-toast";
import { Box, Grid, Paper } from "@material-ui/core";

const initialValues = {
  email: "",
  senha: "",
};

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState<any>(initialValues);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  //Submit user
  function handleSubmit(event: any) {
    event.preventDefault();

    api
      .post("/auth", values)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);

        if (response.data.data) {
          localStorage.setItem("userId", response.data.data.userId);
          toast.success("Bem vindo!");
          navigate("/home");
        }
      })
      .catch((error) => {
        toast.error("Erro ao logar");
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
              height: 420,
              marginLeft: "150px",
              marginTop: "50px"
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
                  <h1>LOGIN</h1>
                </Grid>

                <form onSubmit={handleSubmit}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "30px" }}>
                    <Input
                      name="email"
                      value={values.email}
                      label="E-mail"
                      onChange={handleChange}
                      style={{ color: "#bbb5b5" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "30px" }}>
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
                      <a href="/register" style={{ marginLeft: "1em"}}>Register</a>
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

export default Login;
