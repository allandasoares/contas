import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from '../../services/Api';
import Button from "../Button";

const values = {
  titulo: "",
  cor: "",
};

function ModalNewCategory({
  openCategory,
  setOpenCategory,
  refreshCategories,
}) {
  const formik = useFormik({
    initialValues: values,
    onSubmit: (event) => {
      handleSubmit();
    },
  });
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (!openCategory) {
      formik.resetForm();
    }
  }, [openCategory]);

  //Submit form
  function handleSubmit() {
    if (cancel) return;

    const params = {
      titulo: formik.values?.titulo,
      cor: formik.values?.cor,
    };

    api
      .post("/category", params)
      .then((response) => {
        toast.success("Created category!");
        setOpenCategory(false);
        refreshCategories();
      })
      .catch((error) => {
        toast.error("Error");
      })
      .finally(() => formik.setSubmitting(false));
    formik.resetForm();
  }

  return (
    <>
      <div >
        <Dialog
          open={openCategory}
          onClose={() => {
            setOpenCategory(false);
          }}
        >
          <form onSubmit={formik.handleSubmit}  style={{width: 500}}>
            <DialogTitle>New Category</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="titulo"
                label="Título"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values?.titulo}
                onChange={formik.handleChange}
              />

              <TextField
                autoFocus
                margin="dense"
                name="cor"
                label="Cor"
                type="color"
                fullWidth
                variant="standard"
                value={formik.values?.cor}
                onChange={formik.handleChange}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setCancel(true);
                  setOpenCategory(false);
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

export default ModalNewCategory;
