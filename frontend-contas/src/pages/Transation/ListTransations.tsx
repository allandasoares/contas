import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
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
        toast.success("Transation excluída com sucesso!");
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
          <Grid
            container
            color={"#bbb5b5"}
            style={{ marginTop: 20, marginLeft: 20 }}
          >
            <Typography variant="h5" style={{ color: "#e4e0e0" }}>
              Transations
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
                console.log(transation.banco.nome);
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    style={{ marginTop: 50, marginLeft: 80 }}
                    key={transation.id}
                  >
                    <Box>
                      <Card
                        style={{
                          borderRadius: "25px",
                          background: "#292a2e",
                          width: 350,
                          color: "#bbb5b5",
                        }}
                      >
                        <CardHeader
                          avatar={
                            <Chip
                              label={transation.categoria.titulo}
                              size="small"
                              style={{
                                color: "#ffffff",
                                background: `${transation.categoria.cor}`,
                              }}
                            />
                          }
                          title={
                            <Typography variant="h5">
                              {transation.titulo}
                            </Typography>
                          }
                          // subheader="September 14, 2016"
                          action={
                            <ButtonGroup aria-label="settings">
                              <EditIcon
                                style={{
                                  cursor: "pointer",
                                  color: "#bbb5b5",
                                  marginTop: 10,
                                }}
                                onClick={() => {
                                  setOpenEdit(true);
                                  setTransation(transation);
                                }}
                              ></EditIcon>
                              <DeleteIcon
                                style={{
                                  cursor: "pointer",
                                  color: "#bbb5b5",
                                  marginTop: 10,
                                }}
                                onClick={() => {
                                  handleDelete(transation.id);
                                }}
                              ></DeleteIcon>
                            </ButtonGroup>
                          }
                        />

                        <CardContent>
                          <Typography variant="h6">
                           {transation.tipo}
                          </Typography>
                          <Typography variant="h6">
                            {transation.modo_pagamento}
                          </Typography>
                          <Typography variant="h6">
                            R$ {transation.valor}
                          </Typography>
                          <Typography variant="h6">
                            {transation.descricao}
                          </Typography>
                          <Typography variant="h6">
                            {transation.status}
                          </Typography>
                          <Typography variant="h6" color="error">
                            {moment(transation.data_venc).format("DD/MM/YYYY")}
                          </Typography>
                        </CardContent>

                        <CardMedia
                          style={{
                            width: 70,
                            height: 70,
                            marginLeft: "auto",
                            marginRight: 10,
                          }}
                          component="img"
                          image={
                            transation.banco.nome === "Nubank"
                              ? "/logoNu.png"
                              : transation.banco.nome === "Neon"
                              ? "/logoNeon.png"
                              : transation.banco.nome === "Itau"
                              ? "/logoItau.png"
                              : transation.banco.nome === "Caixa"
                              ? "/logoCaixa.png"
                              : transation.banco.nome === "BB"
                              ? "/logoBB.png"
                              : transation.banco.nome === "Bradesco"
                              ? "/logoBradesco.png"
                              : transation.banco.nome === "Pan"
                              ? "/logoPan.png"
                              : transation.banco.nome === "Cofrinho"
                              ? "/logoCofre.png"
                              : transation.banco.nome === "Inter"
                              ? "/logoInter.png"
                              : "nada"
                          }
                        />
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
