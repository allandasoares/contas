import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import SideMenu from "../../components/SideMenu/SideMenu";
import api from "./../../services/Api";
import ModalBank from "./ModalBank";
import { useNavigate } from "react-router-dom";

export default function ListBank() {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api
      .get("/banks")
      .then((response) => {
        setBanks(response.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar bancos");
      });
  }, []);

  return (
    <>
      <SideMenu>
        <Box className="backgroundHome">
          <br />
          <Grid container color={"#bbb5b5"}>
            <Typography>Banks</Typography>
            <Button
              size="small"
              variant="contained"
              style={{ background: "#4ac2c8", marginLeft: "20px" }}
              onClick={() => {
              <ModalBank></ModalBank>
              }}
            >
              New
            </Button>
          </Grid>
          <br />

          {banks.map((bank) => {
            return (
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" style={{ background: "#393333" }}>
                  <Fragment>
                    <CardContent>
                      <Typography>{bank.nome}</Typography>
                      <Typography>
                        Saldo Inicial: {bank.saldo_inicial}
                      </Typography>
                      <Typography>Saldo Atual: {bank.saldo_atual}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        style={{ background: "#d85a5a" }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        style={{ background: "#f19a58" }}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Fragment>
                </Card>
                <br />
              </Box>
            );
          })}
        </Box>
      </SideMenu>
    </>
  );
}
