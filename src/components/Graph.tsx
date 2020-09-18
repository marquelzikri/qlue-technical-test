import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

interface IGraph {
  data: any[];
  maxChartYAxis: number;
}

export default function Graph(props: IGraph) {
  const { data, maxChartYAxis } = props;

  return (
    <BarChart
      width={1500}
      height={300}
      data={data}
      className="mx-auto"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Name" minTickGap={0} />
      <YAxis
        allowDecimals
        allowDataOverflow
        domain={[0, maxChartYAxis > 100 ? Math.round((maxChartYAxis + 10) / 5) * 5 : 100]}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="Mass" fill="#8884d8" />
      <Bar dataKey="Height" fill="#4299e1" />
    </BarChart>
  )
}
