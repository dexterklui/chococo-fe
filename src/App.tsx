import { useState } from "react";
import "./App.css";
import CoffeeProducts from "./components/CoffeeProducts";

function App() {
  useState();
  return (
    <div className="products">
      <h1>Coffee Connoisseur</h1>
      <CoffeeProducts />
    </div>
  );
}

export default App;
