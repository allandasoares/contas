import {
  Avatar,
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
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/Api";

function PaidHistory() {
  const [pagas, setPagas] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get("/transations")
      .then((response) => {
        //Contas pagas
        let contasPagas = 0;
        const auxPagas = response.data.data.map((item, { quant }) => {
          if (item.tipo === "Despesa" && item.status === "Fechada") {
            return { quant: true };
          } else {
            return { quant: false };
          }
        });
        for (let i = 0; i < auxPagas.length; i++) {
          if (auxPagas[i].quant == true) {
            contasPagas += 1;
          }
        }
        setPagas(contasPagas);

        //Histórico de contas pagas ou pendentes
        const aux = response.data.data.map(
          (item, { titulo, valor, status }) => {
            if (item.tipo === "Despesa") {
              return {
                titulo: item.titulo,
                valor: item.valor,
                status: item.status,
              };
            }
          }
        );

        setHistory(aux);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Typography variant="h6" style={{ color: "#e4e0e0" }}>
        Recently
      </Typography>
      <List>
        {history.map((item) => {
          if (item) {
            return (
              <ListItem style={{ color: "#e4e0e0" }}>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      background:
                        item.status === "Fechada" ? "#46d391" : "#d18e41",
                    }}
                  >
                    {item.status === "Fechada" ? (
                      <CheckCircleIcon />
                    ) : (
                      <WarningIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText primary={item.titulo} secondary={item.status} />
                <Typography color="#a2a1a1">R$ {item.valor}</Typography>
              </ListItem>
            );
          }
        })}
      </List>
    </>
  );
}

export default PaidHistory;
