import { Coffee } from "../../lib/data-fetch/coffee";
import { BarGraph } from "./BarGraph";

export type Schema = {
  graph_type: string;
  y_axis: string;
  x_axis: string;
};

export type BarGraphProps = {
  data: Coffee[];
  schema: Schema;
};

export default function LlmGraph({ data, schema }: BarGraphProps) {
  return (
    <>
      {schema.graph_type === "Bar" && <BarGraph data={data} schema={schema} />}
    </>
  );
}
