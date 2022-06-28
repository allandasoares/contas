import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Button from "../Button";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "../../services/Api";

const values = {
  name: "",
  saldoInicial: "",
  saldoAtual: "",
};

function ModalBank({ open, setOpen, refreshBanks, bank }) {
  const formik = useFormik({
    initialValues: values,
    onSubmit: (event) => {
      handleSubmit();
    },
  });
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (cancel) {
      formik.setValues(values);
      setOpen(false);
    }
  }, [cancel]);

  //Submit form
  function handleSubmit() {
    if (cancel) return;
    console.log("entrou aqui");
    const params = {
      nome: formik.values.name,
      saldo_inicial: formik.values.saldoInicial,
      saldo_atual: formik.values.saldoInicial,
    };

    api
      .post("/bank", params)
      .then((response) => {
        toast.success("Created bank!");
        setOpen(false);
        refreshBanks();
      })
      .catch((error) => {
        toast.error("Error");
      })
      .finally(() => formik.setSubmitting(false));
  }

  return (
    <>
      {/* Modal  */}
      <div>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>New Bank</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.name}
                onChange={formik.handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="saldoInicial"
                label="Initial Value"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.saldoInicial}
                onChange={formik.handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="saldoAtual"
                label="Current Value"
                type="text"
                fullWidth
                variant="standard"
                inputProps={{
                  readOnly: true,
                }}
                value={formik.values?.saldoInicial}
                onChange={formik.handleChange}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
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

export default ModalBank;
