import * as React from "react";
import Box from "@mui/material/Box";
import "./Home.css";
import { Grid, Paper } from "@material-ui/core";
import SideMenu from "../../components/SideMenu/SideMenu";
import CardDash from "../../components/CardDash";
import Card from "../Card/Card";

function Home() {
  return (
    <>
      <SideMenu>
        <Box className="backgroundHome">
          <Grid
            container
            spacing={3}
            style={{
              marginTop: 20,
              maxWidth: "70vw",
              maxHeight: "80vh",
              height: "fit-content",
            }}
          >
            <Grid item xs={12} sm={6} md={3} style={{ height: "fit-content" }}>
              <CardDash
                title="Rendimentos"
                total={1250.32}
                color="success"
                icon={"line-md:arrow-small-up"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} style={{ height: "fit-content" }}>
              <CardDash
                title="Despesas"
                total={227}
                color="error"
                icon={"line-md:arrow-small-down"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} style={{ height: "fit-content" }}>
              <CardDash
                title="Valor de Contas Vencidas"
                total={22.5}
                color="warning"
                icon={"line-md:alert-twotone"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} style={{ height: "fit-content" }}>
              <CardDash
                title="Popança"
                total={1000}
                color="primary"
                icon={"line-md:iconify1"}
              />
            </Grid>
          </Grid>

          <Box
            className="gradient"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 270,
                height: 128,
                borderRadius: 6,
                backgroundColor: "#5ba39b"
              },
            }}
          >
            <Paper />
          </Box>

          {/* <Grid container>
            <h1>TE AMOOOOOOOO</h1>
          </Grid> */}
        </Box>
      </SideMenu>
    </>
  );
}

export default Home;
