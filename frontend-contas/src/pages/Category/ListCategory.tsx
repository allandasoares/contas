import SideMenu from "../../components/SideMenu/SideMenu";
import api from "../../services/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import ModalNewCategory from "../../components/ModalCategories/ModalNewCategory";
import ModalEditCategory from "../../components/ModalCategories/ModalEditCategory";

const values = {
  titulo: "",
  cor: "",
};

function ListCategory() {
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(values);

  //Carregar as categorias
  useEffect(() => {
    loadCategories();
  }, []);

  function loadCategories() {
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar bancos");
      });
  }

  function handleDelete(id) {
    api
      .delete(`/category/${id}`)
      .then((response) => {
        toast.success("Categoria excluído com sucesso!");
        loadCategories();
      })
      .catch((error) => {
        toast.error("Erro ao excluir categoria");
      });
  }

  return (
    <>
      <ModalNewCategory
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        refreshCategories={loadCategories}
      ></ModalNewCategory>

      <ModalEditCategory
        openEditCategory={openEditCategory}
        setOpenEditCategory={setOpenEditCategory}
        refreshCategories={loadCategories}
        category={category}
      ></ModalEditCategory>

      <SideMenu>
        <Box className="backgroundHome">
          <Grid
            container
            color={"#bbb5b5"}
            style={{ marginTop: 20, marginLeft: 20 }}
          >
            <Typography variant="h5" style={{ color: "#e4e0e0" }}>
              Categories
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
                setOpenCategory(true);
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
              {categories.map((category) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    style={{ marginTop: 20, marginLeft: 20 }}
                    key={category.id}
                  >
                    <Chip
                      style={{
                        width: 200,
                        color: "#ffffff",
                        background: `${category.cor}`,
                      }}
                      label={category.titulo}
                      icon={
                        <ButtonGroup>
                          <EditIcon
                            style={{
                              cursor: "pointer",
                              color: "#ffffff",
                            }}
                            onClick={() => {
                              setOpenEditCategory(true);
                              setCategory(category);
                            }}
                          ></EditIcon>

                          <DeleteIcon
                            style={{
                              cursor: "pointer",
                              color: "#ffffff",
                            }}
                            onClick={() => {
                              handleDelete(category.id);
                            }}
                          ></DeleteIcon>
                        </ButtonGroup>
                      }
                    />
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

export default ListCategory;
