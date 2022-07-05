import { Grid, Typography } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

function Graph() {
  const options = {
    title: {
      text: "Balance",
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={8} style={{height: "40vw"}}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Grid>
      </Grid>
    </>
  );
}

export default Graph;
