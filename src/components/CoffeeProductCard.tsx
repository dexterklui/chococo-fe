// @ts-nocheck
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
            {"★".repeat(Math.max(coffee.Attributes_Brightness, 0)) + "☆".repeat(7 - Math.max(coffee.Attributes_Brightness, 0))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Body:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(Math.max(coffee.Attributes_Body, 0)) + "☆".repeat(7 - Math.max(coffee.Attributes_Body, 0))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Aroma:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(Math.max(coffee.Attributes_Aroma, 0)) + "☆".repeat(7 - Math.max(coffee.Attributes_Aroma, 0))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Complexity:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(Math.max(coffee.Attributes_Complexity, 0)) + "☆".repeat(7 - Math.max(coffee.Attributes_Complexity, 0))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Balance:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(Math.max(coffee.Attributes_Balance, 0)) + "☆".repeat(7 - Math.max(coffee.Attributes_Balance, 0))}

            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px" }}>
            <div>Sweetness:</div>
            <div style={{ textAlign: "right", flex: 1 }}>
              {"★".repeat(Math.max(coffee.Attributes_Sweetness, 0)) + "☆".repeat(7 - Math.max(coffee.Attributes_Sweetness, 0))}
            </div>
          </div>
          </>
        }
      />
    </Card>
  );
}
