import { useState } from "react";
import { Coffee } from "../lib/data-fetch/coffee";
import { Card } from "antd";

export default function CoffeeProductCard({ coffee }: { coffee: Coffee }) {
  const [imageSrc, setImageSrc] = useState(coffee.image_url);

  const handleImageError = () => {
    setImageSrc(
      "https://live.staticflickr.com/2842/13554433354_62ca4f24c0_n.jpg",
    );
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          src={imageSrc}
          onError={handleImageError}
          alt={`Logo for ${coffee.name}`}
        />
      }
    >
      <Card.Meta
        title={
          coffee.sourceurl ? (
            <a href={coffee.sourceurl}>{coffee.name}</a>
          ) : (
            coffee.name
          )
        }
        description={`$${coffee["Price / 100g in HKD"]}/100g ${coffee.Country}`}
      />
    </Card>
  );
}
