import { useEffect, useState } from "react";
import { Coffee, getAllCoffee } from "../lib/data-fetch/coffee";
import ChatbotWidget from "./ChatbotWidget";
import CoffeeProductsCatalogue from "./CoffeeProductsCatalogue";
import CoffeeProductTable, { ColDef } from "./CoffeeProductTable";

const defaultColDefs: ColDef[] = [
  { field: "source_type", filter: true },
  { field: "name", filter: true },
  { field: "Taste" },
  { field: "Variety", filter: true },
  { field: "Process", filter: true },
  { field: "Country", filter: true },
  { field: "Region", filter: true },
  { field: "Price_per_100g_HKD" },
  { field: "Roast", filter: true },
];

export default function CoffeeProducts() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const colDefs = defaultColDefs;
  // const [colDefs, setColDefs] = useState<ColDef[]>(defaultColDefs);
  const [tableMode, setTableMode] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCoffee();
      setCoffees(data);
    }
    fetchData();
  }, [setCoffees]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <button onClick={() => setTableMode(!tableMode)}>
          {tableMode ? "Show Catalogue" : "Show Table"}
        </button>
        <button onClick={async () => setCoffees(await getAllCoffee())}>
          Show All Coffees
        </button>
      </div>
      <section>
        {tableMode ? (
          <CoffeeProductTable rowData={coffees} colDefs={colDefs} />
        ) : (
          <CoffeeProductsCatalogue coffees={coffees} />
        )}
      </section>
      <ChatbotWidget setCoffees={setCoffees} coffees={coffees} />
    </>
  );
}
