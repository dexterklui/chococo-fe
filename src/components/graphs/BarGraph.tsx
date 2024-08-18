// @ts-nocheck
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Coffee } from "../../lib/data-fetch/coffee";

export type Schema = {
  graph_type: string;
  y_axis: string;
  x_axis: string;
};

export type BarGraphProps = {
  data: Coffee[];
  schema: Schema;
};

export const BarGraph = ({ data, schema }: BarGraphProps) => {
  const result = [];
  const sumForEachX = new Map();
  const countForEachX = new Map();

  // calculate the average of the y_axis dataKey for each unique value of x_axis dataKey
  for (const coffee of data) {
    if (typeof coffee[schema.y_axis] == "number" && coffee[schema.y_axis] < 0)
      continue;
    const xValue = coffee[schema.x_axis];
    const yValue = coffee[schema.y_axis];
    sumForEachX.set(
      xValue,
      sumForEachX.has(xValue) ? sumForEachX.get(xValue) + yValue : yValue,
    );
    countForEachX.set(
      xValue,
      countForEachX.has(xValue) ? countForEachX.get(xValue) + 1 : 1,
    );
  }

  for (const [key, value] of sumForEachX) {
    result.push({
      [schema.x_axis]: key,
      [schema.y_axis]: value / countForEachX.get(key),
    });
  }

  return (
    <BarChart width={730} height={250} data={result}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={schema.x_axis} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={schema.y_axis} fill="#82ca9d" />
    </BarChart>
  );
};
