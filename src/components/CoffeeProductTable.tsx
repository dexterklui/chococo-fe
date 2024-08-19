// @ts-nocheck
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Coffee } from "../lib/data-fetch/coffee";

export type ColDef = {
  field: string;
  filter?: string | boolean;
  filterParams?: object;
};

const defaultColDefs: ColDef[] = [
  { field: "source_type", filter: true },
  { field: "name", filter: true },
  { field: "Taste" },
  { field: "Variety", filter: true },
  { field: "Process", filter: true },
  { field: "Country", filter: true },
  { field: "Region", filter: true },
  { field: "Price / 100g in HKD" },
  { field: "Roast", filter: true },
  { field: "avg_rating from customer", filter: true },
  { field: "Altitute in meters", filter: true },
  { field: "Flavors_Spicy", filter: true },
  { field: "Flavors_Choclaty", filter: true },
  { field: "Flavors_Nutty", filter: true },
  { field: "Flavors_Buttery", filter: true },
  { field: "Flavors_Fruity", filter: true },
  { field: "Flavors_Flowery", filter: true },
  { field: "Flavors_Winey", filter: true },
  { field: "Flavors_Earthy", filter: true },
  { field: "Attributes_Brightness", filter: true },
  { field: "Attributes_Body", filter: true },
  { field: "Attributes_Aroma", filter: true },
  { field: "Attributes_Complexity", filter: true },
  { field: "Attributes_Balance", filter: true },
  { field: "Attributes_Sweetness", filter: true },
  { field: "summary_comment" },
];

export default function CoffeeProductTable({
  coffees,
  colDefs = defaultColDefs,
}: {
  coffees: Coffee[];
  colDefs?: ColDef[];
}) {
  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500, minWidth: "70vw" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={coffees.map((coffee) => ({
          ...coffee,
          "avg_rating from customer":
            coffee["avg_rating from customer"].toFixed(2),
          "Price / 100g in HKD": coffee["Price / 100g in HKD"].toFixed(2),
        }))}
        columnDefs={colDefs}
      />
    </div>
  );
}
