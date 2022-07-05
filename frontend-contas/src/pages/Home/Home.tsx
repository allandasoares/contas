import Box from "@mui/material/Box";
import "./Home.css";
import { Grid, Paper, Typography } from "@material-ui/core";
import SideMenu from "../../components/SideMenu/SideMenu";
import CardDash from "../../components/CardDash";
import Card from "../Card/Card";
import { useEffect, useMemo, useState } from "react";
import api from "../../services/Api";
import PaidHistory from "../../components/PaidHistory/PaidHistory";
import Graph from '../../components/Graph/Graph';

function Home() {
  const [recebimentos, setRecebimentos] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [cofrinho, setCofrinho] = useState(0);

  // UseEffect para carregar o cofrinho
  useEffect(() => {
    api
      .get("/banks")
      .then((response) => {
        response.data.data.forEach((item) => {
          if (item.nome === "Cofrinho") {
            setCofrinho(item.saldo_atual);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // UseEffect para carregar os valores da dashboard
  useEffect(() => {
    api
      .get("/dashboard")
      .then((response) => {
        setRecebimentos(response.data.data.recebimentos);
        setDespesas(response.data.data.despesas);
        setPendentes(response.data.data.pendentes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <SideMenu>
        <Box className="backgroundHome">
          <div style={{overflow: "auto"}}>
          <Typography
            variant="h5"
            style={{ color: "#e4e0e0", marginTop: 30, marginLeft: 40 }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ color: "#a2a1a1", marginLeft: 40 }}
          >
            Updated transactions
          </Typography>
          <Grid
            container
            spacing={3}
            style={{
              marginTop: 20,
              maxWidth: "90vw",
              maxHeight: "80vh",
              height: "fit-content",
              marginLeft: 30,
              // overflow: "auto",
            }}
          >
            <Grid item xs={12} sm={6} md={2} style={{ height: "fit-content" }}>
              <CardDash
                title="Valor dos recebimentos"
                total={recebimentos}
                color="success"
                icon={"line-md:arrow-small-up"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2} style={{ height: "fit-content" }}>
              <CardDash
                title="Valor das despesas"
                total={despesas}
                color="error"
                icon={"line-md:arrow-small-down"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2} style={{ height: "fit-content" }}>
              <CardDash
                title="Valor de contas pendentes"
                total={pendentes}
                color="warning"
                icon={"line-md:alert-twotone"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2} style={{ height: "fit-content" }}>
              <CardDash
                title="Popança"
                total={cofrinho}
                color="primary"
                icon={"line-md:iconify1"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} style={{ height: "fit-content", marginLeft: 50 }}>
              <PaidHistory></PaidHistory>
            </Grid>

            <Grid item xs={12} sm={6} md={8} style={{ height: "fit-content" }}>
              <Graph/>
            </Grid>
          </Grid>


          {/* <Box
            className="gradient"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 270,
                height: 128,
                borderRadius: 6,
                backgroundColor: "#5ba39b",
              },
            }}
          >
            <Paper />
          </Box> */}

          {/* <Grid container>
            <h1>TE AMOOOOOOOO</h1>
          </Grid> */}
          </div>
        </Box>
      </SideMenu>
    </>
  );
}

export default Home;
