// @ts-nocheck
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export type ColDef = {
  field: string;
  filter?: string | boolean;
  filterParams?: object;
};

export default function CoffeeProductTable({
  rowData,
  colDefs,
}: {
  rowData: object[];
  colDefs: object[];
}) {
  rowData = rowData.map((row) => {
    return {
      ...row,
      "avg_rating from customer": row["avg_rating from customer"].toFixed(2),
      "Price / 100g in HKD": row["Price / 100g in HKD"].toFixed(2),
    };
  });

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500, minWidth: "70vw" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
