import { Coffee } from "../lib/data-fetch/coffee";
import CoffeeProductCard from "./CoffeeProductCard";

export default function CoffeeProductsCatalogue({
  coffees,
}: {
  coffees: Coffee[];
}) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {coffees.map((coffee) => (
        <CoffeeProductCard key={coffee.name} coffee={coffee} />
      ))}
    </div>
  );
}
