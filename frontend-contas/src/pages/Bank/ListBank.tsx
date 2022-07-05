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
import DeleteIcon from "@mui/icons-material/Delete";

const values = {
  name: "",
  saldo_inicial: null,
  saldo_atual: null,
};

export default function ListBank() {
  const [openBank, setOpenBank] = useState(false);
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
        openBank={openBank}
        setOpenBank={setOpenBank}
        refreshBanks={loadBanks}
        bank={bank}
      ></ModalBank>

      <SideMenu>
        <Box className="backgroundHome">
          <Grid
            container
            color={"#bbb5b5"}
            style={{ marginTop: 20, marginLeft: 20 }}
          >
            <Typography variant="h5" style={{ color: "#e4e0e0" }}>
              Banks
            </Typography>
            <Button
              size="small"
              variant="contained"
              style={{
                background: "#3fc290",
                marginLeft: "20px",
                color: "#ffffff",
              }}
              onClick={() => {
                setOpenBank(true);
              }}
            >
              New
            </Button>
          </Grid>

          {/* Cards  */}
          <div
            style={{
              overflow: "auto",
              width: "96vw",
              height: "80vh",
              marginLeft: 20,
            }}
          >
            <Grid container spacing={0}>
              {banks.map((bank) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ marginTop: 20 }}
                    key={bank.id}
                  >
                    <Box>
                      <Card
                        variant="outlined"
                        style={{
                          borderRadius: "25px",
                          background: "#292a2e",
                          width: 300,
                          color: "#bbb5b5",
                        }}
                      >
                        <Fragment>
                          <CardContent>
                            <Typography
                              variant="h6"
                              style={{ color: "#ffffff" }}
                            >
                              {bank.nome}
                            </Typography>
                            <Typography>
                              Saldo Inicial: {bank.saldo_inicial}
                            </Typography>
                            <Typography>
                              Saldo Atual: {bank.saldo_atual}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <DeleteIcon
                              style={{
                                cursor: "pointer",
                                color: "#bbb5b5",
                              }}
                              onClick={() => {
                                handleDelete(bank.id);
                              }}
                            ></DeleteIcon>
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
