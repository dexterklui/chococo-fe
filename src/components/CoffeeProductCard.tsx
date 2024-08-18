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
        description={
          <>
          ${coffee["Price / 100g in HKD"].toFixed(2)}/100g 
          <br /> 
          from {coffee.Country}
          <br />          
              <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Brightness:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(coffee.Attributes_Brightness) + "☆".repeat(7 - coffee.Attributes_Brightness)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Body:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(coffee.Attributes_Body) + "☆".repeat(7 - coffee.Attributes_Body)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Aroma:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(coffee.Attributes_Aroma) + "☆".repeat(7 - coffee.Attributes_Aroma)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Complexity:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(coffee.Attributes_Complexity) + "☆".repeat(7 - coffee.Attributes_Complexity)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Balance:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(coffee.Attributes_Balance) + "☆".repeat(7 - coffee.Attributes_Balance)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Sweetness:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(coffee.Attributes_Sweetness) + "☆".repeat(7 - coffee.Attributes_Sweetness)}
            </div>
          </div>
          </>
        }
      />
    </Card>
  );
}
