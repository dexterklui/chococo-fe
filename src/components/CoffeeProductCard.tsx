import { useState } from "react";
import { Coffee } from "../lib/data-fetch/coffee";

export default function CoffeeProductCard({ coffee }: { coffee: Coffee }) {
  const [imageSrc, setImageSrc] = useState(coffee.image_url);

  const handleImageError = () => {
    setImageSrc(
      "https://live.staticflickr.com/2842/13554433354_62ca4f24c0_n.jpg",
    );
  };

  return (
    <div>
      <h3>{coffee.name}</h3>
      {/* <img src={coffee.image_url} alt={`Logo for ${coffee.name}`} /> */}
      <img
        src={imageSrc}
        onError={handleImageError}
        alt={`Logo for ${coffee.name}`}
      />
      <p>Origin: {coffee.Country}</p>
    </div>
  );
}
