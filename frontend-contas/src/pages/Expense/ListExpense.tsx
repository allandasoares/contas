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
import api from "../../services/Api";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

function ListExpense() {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api
      .get("/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        toast.error("Erro ao buscar bancos");
      });
  }, []);

  return (
    <>
      <SideMenu>
        <Box className="backgroundHome">
          <br />
          <Grid container color={"#bbb5b5"}>
            <Typography>Expenses</Typography>
            <Button
              size="small"
              variant="contained"
              style={{ background: "#4ac2c8", marginLeft: "20px" }}
              onClick={handleClickOpen}
            >
              New
            </Button>
          </Grid>

          {/* Modal  */}
          <Grid>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>New expense</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText> */}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Initial Value"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Current Value"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Create</Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <br />

          {/* Cards  */}
          {expenses.map((expense) => {
            return (
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" style={{ background: "#393333" }}>
                  <Fragment>
                    <CardContent>
                      <Typography>{expense.nome}</Typography>
                      <Typography>
                        Saldo Inicial: {expense.saldo_inicial}
                      </Typography>
                      <Typography>
                        Saldo Atual: {expense.saldo_atual}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        style={{ background: "#d85a5a" }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        style={{ background: "#f19a58" }}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Fragment>
                </Card>
                <br />
              </Box>
            );
          })}
        </Box>
      </SideMenu>
    </>
  );
}

export default ListExpense;
