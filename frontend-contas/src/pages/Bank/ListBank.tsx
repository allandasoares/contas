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
import ModalBank from "../../components/ModalBanks/ModalBank";

const values = {
  name: "",
  saldo_inicial: null,
  saldo_atual: null,
};

export default function ListBank() {
  const [open, setOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState({});
  // const [selectedBank, setSelectedBank] = useState(values);

  //Carregar os bancos
  useEffect(() => {
    loadBanks();
  }, []);

  function loadBanks() {
    api
      .get("/banks")
      .then((response) => {
        setBanks(response.data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar bancos");
      });
  }

  function handleDelete(id) {
    api
      .delete(`/bank/${id}`)
      .then((response) => {
          toast.success("Banco excluído com sucesso!");
          loadBanks();
      })
      .catch((error) => {
        toast.error("Erro ao excluir banco");
      });
  }

  return (
    <>
      <ModalBank
        open={open}
        setOpen={setOpen}
        refreshBanks={loadBanks}
        bank={bank}
      ></ModalBank>

      <SideMenu>
        <Box className="backgroundHome">
          <Grid container color={"#bbb5b5"} style={{ marginTop: 20 }}>
            <Typography>Banks</Typography>
            <Button
              size="small"
              variant="contained"
              style={{ background: "#4ac2c8", marginLeft: "20px" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              New
            </Button>
          </Grid>

          {/* Cards  */}
          <div style={{ overflow: "auto", width: "96vw", height: "80vh" }}>
            <Grid container spacing={0}>
              {banks.map((bank) => {
                return (
                  <Grid item xs={12} sm={6} md={3} style={{ marginTop: 20 }} key={bank.id}>
                    <Box>
                      <Card
                        variant="outlined"
                        style={{
                          background: "#393333",
                          width: 300,
                          color: "#bbb5b5",
                        }}
                      >
                        <Fragment>
                          <CardContent>
                            <Typography>{bank.nome}</Typography>
                            <Typography>
                              Saldo Inicial: {bank.saldo_inicial}
                            </Typography>
                            <Typography>
                              Saldo Atual: {bank.saldo_atual}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              variant="contained"
                              style={{ background: "#d85a5a" }}
                              onClick={() => {
                                handleDelete(bank.id);
                              }}
                            >
                              Delete
                            </Button>
                            {/* <Button
                        size="small"
                        variant="contained"
                        style={{ background: "#f19a58" }}
                        >
                        Edit
                      </Button> */}
                          </CardActions>
                        </Fragment>
                      </Card>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Box>
      </SideMenu>
    </>
  );
}
