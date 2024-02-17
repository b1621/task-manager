// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// const data = [
//   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   // ... more data points
// ];
// const MyBarChart = () => (
//   <BarChart
//     width={500}
//     height={300}
//     data={data}
//     margin={{
//       top: 5,
//       right: 30,
//       left: 20,
//       bottom: 5,
//     }}
//   >
//     <CartesianGrid strokeDasharray="3  3" />
//     <XAxis dataKey="name" />
//     <YAxis />
//     <Tooltip />
//     <Bar dataKey="pv" fill="#8884d8" />
//     <Bar dataKey="uv" fill="#82ca9d" />
//   </BarChart>
// );

// export default MyBarChart;

// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Todo", value: 100 },
//   { name: "Done", value: 300 },
//   { name: "In Progress", value: 200 },
//   { name: "Urgent", value: 200 },
// ];

// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF0000"];
// const COLORS = ["#FF007F", "#00C49F", "#FFBB28", "#FF0000"];

// const TaskChart = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={60}
//           outerRadius={80}
//           fill="#8884d8"
//           paddingAngle={5}
//           dataKey="value"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default TaskChart;

import React from "react";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";

const data = [
  { name: "Todo", value: 100 },
  { name: "Done", value: 300 },
  { name: "In Progress", value: 200 },
  { name: "Urgent", value: 200 },
];

const COLORS = ["#FF007F", "#00C49F", "#FFBB28", "#FF0000"];

const TaskPriorityChart = () => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  const renderCustomizedLabel = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
      payload,
    } = props;
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskPriorityChart;
