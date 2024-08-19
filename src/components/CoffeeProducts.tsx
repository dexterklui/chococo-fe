import { useEffect, useState } from "react";
import { Coffee, getAllCoffee } from "../lib/data-fetch/coffee";
import ChatbotWidget from "./ChatbotWidget";
import CoffeeProductsCatalogue from "./CoffeeProductsCatalogue";
import CoffeeProductTable from "./CoffeeProductTable";

export default function CoffeeProducts() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [allCoffees, setAllCoffees] = useState<Coffee[]>([]);
  const [tableMode, setTableMode] = useState<boolean>(false);

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
          <CoffeeProductTable coffees={coffees} />
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
