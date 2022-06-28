import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  dateExpect: "",
  payday: "",
  status: "",
  paymentMode: "",
  categoryId: "",
  bankId: "",
};

function ModalEditTransation({ openEdit, setOpenEdit, refreshTransations, transation }) {
  const formik = useFormik({
    initialValues: values,
    onSubmit: (event) => {
      handleSubmit();
    },
  });
  
  useEffect(() => {
    formik.setValues({
      title: transation.titulo,
      description: transation.descricao,
      value: transation.valor,
      dateExpect: transation.data_venc,
      payday: transation.data_pag,
      status: transation.status,
      paymentMode: transation.modo_pagamento,
      categoryId: transation.categoria_id,
      bankId: transation.banco_id,
    });
  }, [transation]);

  function handleSubmit() {
    // api
    //   .put(`/transation/${transation.id}/${formik.values}`)
    //   .then((response) => {
    //     if (response.status == 200) {
    //       toast.success("Created transation!");
    //     }
    //     setOpen(false);
    //     refreshTransations();
    //   })
    //   .catch((error) => {
    //     toast.error("Error");
    //     console.log(error);
    //   })
    //   .finally(() => formik.setSubmitting(false));
  }

  return (
    <>
      <div>
        <Dialog
          open={openEdit}
          onClose={() => {
            setOpenEdit(false);
          }}
        >
          <form onSubmit={formik.handleSubmit} style={{ height: "370px" }}>
            <DialogTitle>Edit transation</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText> */}

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
              <TextField
                autoFocus
                margin="dense"
                name="value"
                label="Valor"
                type="text"
                fullWidth
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                value={formik.values?.value}
                onChange={formik.handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                name="dateExpect"
                label="Date Expect"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.dateExpect}
                onChange={formik.handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="payday"
                label="Payday"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.payday}
                onChange={formik.handleChange}
              />


              <TextField
                autoFocus
                margin="dense"
                name="status"
                label="Status"
                type="text"
                fullWidth
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                value={formik.values?.status}
                onChange={formik.handleChange}
              />

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

              {/* <TextField
                autoFocus
                margin="dense"
                name="categoryId"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.categoryId}
                onChange={formik.handleChange}
              /> */}

              {/* <TextField
                autoFocus
                margin="dense"
                name="bankId"
                label="Bank"
                type="text"
                fullWidth
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                value={formik.values?.bankId}
                onChange={formik.handleChange}
              /> */}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button disabled={formik.isSubmitting}>Edit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default ModalEditTransation;
