import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "../Button";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "../../services/Api";
import { useEffect, useState } from "react";
import moment from "moment";

const values = {
  title: "",
  description: "",
  value: "",
  dateExpect: new Date(),
  payday: new Date(),
  type: "",
  status: "",
  paymentMode: "",
  categoryId: "",
  bankId: "",
};

function ModalNewTransation({ openNew, setOpenNew, refreshTransations }) {
  const [status, setStatus] = useState("");
  const formik = useFormik({
    initialValues: values,
    onSubmit: (event) => {
      handleSubmit();
    },
  });
  const [cancel, setCancel] = useState(false);
  const [banks, setBanks] = useState([]);
  const [categories, setCategories] = useState([]);

  function clearForm() {
    formik.setValues(values);
    setOpenNew(false);
  }

  function handleSubmit() {
    if (cancel) return;

    console.log("aqui")
    const params = {
      titulo: formik.values.title,
      descricao: formik.values.description,
      valor: formik.values.value,
      data_venc: moment(formik.values.dateExpect).format("YYYY/MM/DD"),
      data_pag: moment(formik.values.payday).format("YYYY/MM/DD"),
      tipo: formik.values.type,
      status: formik.values.status,
      modo_pagamento: formik.values.paymentMode,
      categoria_id: formik.values.categoryId,
      banco_id: formik.values.bankId,
    };

    api
      .post("/transation", params)
      .then((response) => {
        if (response.data.code === 200) {
          toast.success("Created transation!");
        }
        setOpenNew(false);
        refreshTransations();
      })
      .catch((error) => {
        toast.error("Error");
        console.log(error);
      })
      .finally(() => formik.setSubmitting(false));
  }

  //UseEffect para trazer os bancos
  useEffect(() => {
    api
      .get("/banks")
      .then((response) => {
        const aux = response.data.data.map(({ id, nome }) => ({
          value: id,
          label: nome,
        }));
        setBanks(aux);
      })
      .catch((error) => {
        toast.error("Erro ao buscar bancos");
      });
  }, []);

  //UseEffect para trazer as categorias
  useEffect(() => {
    api
      .get("/categories")
      .then((response) => {
        const aux = response.data.data.map(({ id, titulo }) => ({
          value: id,
          label: titulo,
        }));
        setCategories(aux);
      })
      .catch((error) => {
        toast.error("Erro ao buscar categorias");
      });
  }, []);

  return (
    <>
      <div>
        <Dialog
          open={openNew}
          onClose={() => {
            setOpenNew(false);
          }}
        >
          <form onSubmit={formik.handleSubmit} style={{ height: "370px" }}>
            <DialogTitle>New transation</DialogTitle>
            <DialogContent>
              {/* Title  */}
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Título"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.title}
                onChange={formik.handleChange}
              />
              {/* Description  */}
              <TextField
                autoFocus
                margin="dense"
                name="description"
                label="Descrição"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.description}
                onChange={formik.handleChange}
              />
              {/* Value  */}
              <TextField
                autoFocus
                margin="dense"
                name="value"
                label="Valor"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.value}
                onChange={formik.handleChange}
              />

              {/* Date Expect  */}
              <InputLabel style={{ marginTop: 30 }}>Date Expect</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                name="dateExpect"
                type="date"
                fullWidth
                variant="standard"
                value={formik.values?.dateExpect}
                onChange={formik.handleChange}
              />

              {/* Type */}
              <InputLabel style={{ marginTop: 30 }}>Type</InputLabel>
              <Select
                style={{ width: "100%" }}
                label="Type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                <MenuItem value={"Despesa"}>Despesa</MenuItem>
                <MenuItem value={"Recebimento"}>Recebimento</MenuItem>
              </Select>

              {/* Status  */}
              <InputLabel style={{ marginTop: 30 }}>Status</InputLabel>
              <Select
                style={{ width: "100%" }}
                label="Status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <MenuItem value={"Paga"}>Paga</MenuItem>
                <MenuItem value={"Pendente"}>Pendente</MenuItem>
                <MenuItem value={"Vencida"}>Vencida</MenuItem>
              </Select>

              {/* Date  */}
              <InputLabel style={{ marginTop: 30 }}>Payday</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                name="payday"
                type="date"
                fullWidth
                variant="standard"
                value={formik.values?.payday}
                onChange={formik.handleChange}
              />

              {/* Payment  */}
              <TextField
                autoFocus
                margin="dense"
                name="paymentMode"
                label="Payment Mode"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.paymentMode}
                onChange={formik.handleChange}
              />

              {/* Category  */}
              <InputLabel style={{ marginTop: 30 }}>Categories</InputLabel>
              <Select
                style={{ width: "100%", marginTop: 10 }}
                label="Categories"
                name="categoryId"
                value={formik.values.categoryId}
                onChange={formik.handleChange}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem key={category.value} value={category.value}>
                      {" "}
                      {category.label}{" "}
                    </MenuItem>
                  );
                })}
              </Select>

              {/* Bank  */}
              <InputLabel style={{ marginTop: 30 }}>Banks</InputLabel>
              <Select
                style={{ width: "100%", marginTop: 10 }}
                label="Banks"
                name="bankId"
                value={formik.values?.bankId}
                onChange={formik.handleChange}
              >
                {banks.map((bank) => {
                  return (
                    <MenuItem key={bank.value} value={bank.value}>
                      {bank.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  clearForm();
                  setCancel(true);
                }}
              >
                Cancel
              </Button>
              <Button disabled={formik.isSubmitting}>Create</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default ModalNewTransation;
