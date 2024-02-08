import React from "react";
import Chart from "react-apexcharts";

// const PieChart = React.memo(() =>{
  function PieChart() {

  const sampleSalesData = [10, 30, 12, 13];
  const sampleSubjects = ["By Now", "In Store Order", "Free Sampling", "Free Design"];


  const blueColor = "#3498db";

  // Calculate percentage for each data point
  const total = sampleSalesData.reduce((acc, value) => acc + value, 0);
  const percentages = sampleSalesData.map((value) => ((value / total) * 100).toFixed(2));

  // Generate shades of blue based on the percentages
  const shadesOfBlue = percentages.map((percentage) => `rgba(52, 152, 219, ${percentage / 100})`);

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <Chart
          type="pie"
          width="100%"
          height="300"
          series={sampleSalesData}
          options={{
            title: { text: "Sales PieChart" },
            noData: { text: "Empty Data" },
            colors: shadesOfBlue,
            labels: sampleSubjects,
            dataLabels: {
              formatter: function (val, opts) {
                return `${opts.w.globals.series[opts.seriesIndex]}%`;
              },
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default PieChart;

// <--------using usememo ------->

// import React, { useMemo } from "react";
// import Chart from "react-apexcharts";

// function PieChart() {
//   const sampleSalesData = [10, 30, 12, 13];
//   const sampleSubjects = ["By Now", "In Store Order", "Free Sampling", "Free Design"];

//   // Define a single shade of blue
//   const blueColor = "#3498db";

//   // Memoize the calculations using useMemo
//   const memoizedValues = useMemo(() => {
//     // Calculate percentage for each data point
//     const total = sampleSalesData.reduce((acc, value) => acc + value, 0);
//     const percentages = sampleSalesData.map((value) => ((value / total) * 100).toFixed(2));

//     // Generate shades of blue based on the percentages
//     const shadesOfBlue = percentages.map((percentage) => `rgba(52, 152, 219, ${percentage / 100})`);

//     return { percentages, shadesOfBlue };
//   }, [sampleSalesData]);

//   const { percentages, shadesOfBlue } = memoizedValues;

//   return (
//     <React.Fragment>
//       <div className="container-fluid mb-3">
//         <Chart
//           type="pie"
//           width="100%"
//           height="300"
//           series={sampleSalesData}
//           options={{
//             title: { text: "Sales PieChart" },
//             noData: { text: "Empty Data" },
//             colors: shadesOfBlue,
//             labels: sampleSubjects,
//             dataLabels: {
//               formatter: function (val, opts) {
//                 return `${opts.w.globals.series[opts.seriesIndex]}%`;
//               },
//             },
//           }}
//         />
//       </div>
//     </React.Fragment>
//   );
// }

// // Memoize the component to prevent unnecessary re-renders
// export default React.memo(PieChart);
