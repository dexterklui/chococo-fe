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
  { field: "avg_rating_from_customer", filter: true },
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
];

export default function CoffeeProducts() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [allCoffees, setAllCoffees] = useState<Coffee[]>([]);
  const colDefs = defaultColDefs;
  // const [colDefs, setColDefs] = useState<ColDef[]>(defaultColDefs);
  const [tableMode, setTableMode] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCoffee();
      setCoffees(data);
      setAllCoffees(data);
    }
    fetchData();
  }, [setCoffees, setAllCoffees]);

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
      <ChatbotWidget
        setCoffees={setCoffees}
        coffees={coffees}
        allCoffees={allCoffees}
      />
    </>
  );
}
