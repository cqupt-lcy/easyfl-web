import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
export default function Charts({result}) {
  return (
    <div>
    <h3 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px", marginLeft: "20px" }}>训练结果</h3>
    <LineChart width={1000} height={400} data={result}>
      <Line type="monotone" dataKey="testAcc" stroke="#8884d8" />
      <Line type="monotone" dataKey="loss" stroke="#82ca9d" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="round" />
      <YAxis type="number" domain={[0, 1]} allowDataOverflow />
      <Tooltip />
    </LineChart>
  </div>
  )
}
