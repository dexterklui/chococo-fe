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
  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500, minWidth: "70vw" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
