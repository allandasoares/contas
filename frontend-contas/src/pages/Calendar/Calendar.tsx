import FullCalendar from "@fullcalendar/react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import SideMenu from "../../components/SideMenu/SideMenu";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function Calendar() {
  return (
    <>
      <SideMenu>
        <Box className="backgroundHome">
          {/* <Grid container color={"#bbb5b5"} style={{ marginTop: 20 }}>
            <Typography>Calendar</Typography>
            <Button
              size="small"
              variant="contained"
              style={{ background: "#4ac2c8", marginLeft: "20px" }}
            >
              New
            </Button>
          </Grid> */}

          <div style={{ overflow: "auto", width: "96vw", height: "85vh" }}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                />
              </Grid>
            </Grid>
          </div>
        </Box>
      </SideMenu>
    </>
  );
}

export default Calendar;
