import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@material-ui/core";
import { Box, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import SideMenu from "../../components/SideMenu/SideMenu";
import api from "../../services/Api";
import ModalNewTransation from "../../components/ModalTransations/ModalNewTransation";
import ModalEditTransation from "../../components/ModalTransations/ModalEditTransation";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const values = {
  title: "",
  description: "",
  value: "",
  dateExpect: "",
  payday: "",
  type: "",
  status: "",
  paymentMode: "",
  categoryId: "",
  bankId: "",
};

function ListTransations() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [transations, setTransations] = useState([]);
  const [transation, setTransation] = useState(values);

  //Carregar as transations
  useEffect(() => {
    loadTransations();
  }, []);

  function loadTransations() {
    api
      .get("/transations")
      .then((response) => {
        setTransations(response.data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar transations");
      });
  }

  function handleDelete(id) {
    api
      .delete(`/transation/${id}`)
      .then((response) => {
        toast.success("transation excluída com sucesso!");
        loadTransations();
      })
      .catch((error) => {
        toast.error("Erro ao excluir transation");
      });
  }

  return (
    <>
      <ModalNewTransation
        openNew={openNew}
        setOpenNew={setOpenNew}
        refreshTransations={loadTransations}
      ></ModalNewTransation>

      <ModalEditTransation
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        refreshTransations={loadTransations}
        transation={transation}
      ></ModalEditTransation>

      <SideMenu>
        <Box className="backgroundHome">
          <Grid container color={"#bbb5b5"} style={{ marginTop: 20 }}>
            <Typography>Transations</Typography>
            <Button
              size="small"
              variant="contained"
              style={{ background: "#4ac2c8", marginLeft: "20px" }}
              onClick={() => {
                setOpenNew(true);
              }}
            >
              New
            </Button>
          </Grid>

          {/* Cards  */}
          <div style={{ overflow: "auto", width: "96vw", height: "80vh" }}>
            <Grid container spacing={0}>
              {transations.map((transation) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ marginTop: 20 }}
                    key={transation.id}
                  >
                    <Box>
                      <Card
                        style={{
                          background: "#393333",
                          width: 350,
                          color: "#bbb5b5",
                        }}
                      >
                        <Fragment>
                          <CardContent>
                            <Typography>Título: {transation.titulo}</Typography>
                            <Typography>
                              Descrição: {transation.descricao}
                            </Typography>

                            <Typography>Valor: {transation.valor}</Typography>

                            <Typography>
                              Data de vencimento:{" "}
                              {moment(transation.data_venc).format("DD/MM/YYYY")}
                            </Typography>

                            <Typography>
                              Data de pagamento:{" "}
                              {moment(transation.data_pag).format("DD/MM/YYYY")}
                            </Typography>

                            {/* <Typography>Status: {transation.status}</Typography> */}

                            <Typography>
                              Modo Pagamento: {transation.modo_pagamento}
                            </Typography>

                            <Chip
                              label={transation.status}
                              style={{
                                backgroundColor:
                                  transation.status == "Paga"
                                    ? "#74ce67"
                                    : transation.status == "Pendente"
                                    ? "#db8942"
                                    : transation.status == "Vencida"
                                    ? "#cd5858"
                                    : "#888282",
                              }}
                            />
                            {/* <Typography>
                        Categoria: {transation.categoria}
                      </Typography>

                      <Typography>
                        Banco: {transation.banco}
                      </Typography> */}
                          </CardContent>

                          <CardActions>
                            {/* <Button
                              size="small"
                              variant="contained"
                              style={{ background: "#d85a5a", color: "#fff" }}
                              onClick={() => {
                                handleDelete(transation.id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              style={{ background: "#f19a58", color: "#fff" }}
                              onClick={() => {
                                setOpenEdit(true);
                                setTransation(transation);
                              }}
                            >
                              Edit
                            </Button> */}

                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleDelete(transation.id);
                              }}
                            ></DeleteIcon>

                            <EditIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setOpenEdit(true);
                                setTransation(transation);
                              }}
                            ></EditIcon>
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

export default ListTransations;
