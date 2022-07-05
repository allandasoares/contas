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
import api from "../../services/Api";
import Button from "../Button";

const values = {
  titulo: "",
  cor: "",
};

function ModalEditCategory({
  openEditCategory,
  setOpenEditCategory,
  refreshCategories,
  category,
}) {
  const formik = useFormik({
    initialValues: values,
    onSubmit: (event) => {
      handleSubmit();
    },
  });
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    formik.setValues({
      titulo: category.titulo,
      cor: category.cor,
    });
  }, [category]);

  //Submit form
  function handleSubmit() {
    if (cancel) return;

    const params = {
      titulo: formik.values?.titulo,
      cor: formik.values?.cor,
    };

    api
      .put(`/category/${category.id}`, params)
      .then((response) => {
        toast.success("Edited category!");
        setOpenEditCategory(false);
        refreshCategories();
      })
      .catch((error) => {
        toast.error("Error");
      })
      .finally(() => formik.setSubmitting(false));
  }

  return (
    <>
      <div>
        <Dialog
          open={openEditCategory}
          onClose={() => {
            setOpenEditCategory(false);
          }}
        >
          <form onSubmit={formik.handleSubmit} style={{ width: 500 }}>
            <DialogTitle>Edit Category</DialogTitle>
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
                  setOpenEditCategory(false);
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

export default ModalEditCategory;
