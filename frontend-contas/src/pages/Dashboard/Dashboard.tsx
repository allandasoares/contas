import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/Api";
import SideMenu from "./../../components/SideMenu/SideMenu";

function Dashboard({ contasBancarias }) {
  const [pagas, setPagas] = useState([]);
  const [profile, setProfile] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  //Recebimentos
  useEffect(() => {
    api
      .get("/transations")
      .then((response) => {
        //Histórico de recebimentos
        const aux = response.data.data.map(
          (item, { titulo, valor, status }) => {
            if (item.tipo === "Recebimento" && item.status === "Fechada") {
              return {
                titulo: item.titulo,
                valor: item.valor,
                status: item.status,
              };
            }
          }
        );
        setPagas(aux);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Trazendo o perfil
  useEffect(() => {
    api
      .get(`/usuarios/${userId}`)
      .then((response) => {
        if (response.data.data.perfil_id === 1) {
          console.log("AQUI", response.data.perfil_id)
          setProfile(false);
        } if(response.data.data.perfil_id === 2) {
          setProfile(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log('perfil',profile)

  {
    if (profile === true) {
      return (
        <SideMenu>
          <Box className="backgroundHome">
            <Typography
              variant="h5"
              style={{ color: "#e4e0e0", marginTop: 30, marginLeft: 30 }}
            >
              Receipts
            </Typography>

            <Grid container>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                style={{ height: "fit-content", marginLeft: 20 }}
              >
                <List>
                  {pagas.map((item) => {
                    if (item) {
                      return (
                        <ListItem style={{ color: "#e4e0e0" }}>
                          <ListItemAvatar>
                            <Avatar
                              style={{
                                background: "#46d3d1",
                              }}
                            >
                              <ExitToAppIcon />
                            </Avatar>
                          </ListItemAvatar>

                          <ListItemText
                            primary={item.titulo}
                            secondary={item.status}
                          />
                          <Typography color="#a2a1a1">
                            R$ {item.valor}
                          </Typography>
                        </ListItem>
                      );
                    }
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
        </SideMenu>
      );
    } if(profile === false) {
      return (
        <SideMenu>
          <Box className="backgroundHome">
            <Typography
              variant="h5"
              style={{ color: "#e4e0e0", marginTop: 30, marginLeft: 30 }}
            >
              Mude o plano para obter mais funcionalidades!
            </Typography>
          </Box>
        </SideMenu>
      );
    }
  }
}

export default Dashboard;
