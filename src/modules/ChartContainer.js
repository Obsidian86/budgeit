import React from "react";
import PieChart from "react-minimal-pie-chart";

const ChartContainer = ({ styles, data }) => {
  return (
    <div style={styles}>
      <PieChart animate textAnchor data={data} />
    </div>
  );
};

export default ChartContainer;
