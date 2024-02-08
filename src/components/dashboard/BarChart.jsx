import React  from "react";
import Chart from "react-apexcharts";


  // const BarChart = React.memo(({ data }) => {
 function BarChart({ data }) {
  return (
    <React.Fragment>
      <Chart
        type="bar"
        width="100%"
        height="300"
        series={[
          {
            name: "Sales",
            data: data,
          },
        ]}
        options={{
          colors: ["#0ea5e9"],
          theme: { mode: "light" },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            title: {
              text: "Month",
              style: { fontSize: 16 },
            },
          },
          yaxis: {
            labels: {
              formatter: (val) => {
                return `₹${val}`;
              },
              style: { fontSize: "15", colors: ["#0ea5e9"] },
            },
            title: {
              text: "Sales (₹)",
              style: { color: "#0ea5e9", fontSize: 16 },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        }}
      />
    </React.Fragment>
  );
}

export default BarChart;
// export default React.memo(BarChart);
