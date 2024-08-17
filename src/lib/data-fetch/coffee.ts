const COFFEE_URL = "http://localhost:8000/coffee/all";
const COFFEE_LLM_URL = "http://localhost:8000/coffee/llm";

export const CoffeeKeyDef = [
  { field: "sourceurl" },
  { field: "source_type" },
  { field: "name" },
  { field: "image_url" },
  { field: "Taste" },
  { field: "Variety" },
  { field: "Process" },
  { field: "Country" },
  { field: "Region" },
  { field: "Price_per_100g_HKD" },
  { field: "Altitude_in_meters" },
  { field: "Roast" },
  { field: "Comments" },
  { field: "avg_rating_from_customer" },
  { field: "Flavors_Spicy" },
  { field: "Flavors_Chocolaty" },
  { field: "Flavors_Nutty" },
  { field: "Flavors_Buttery" },
  { field: "Flavors_Fruity" },
  { field: "Flavors_Flowery" },
  { field: "Flavors_Winey" },
  { field: "Flavors_Earthy" },
  { field: "Attributes_Brightness" },
  { field: "Attributes_Body" },
  { field: "Attributes_Aroma" },
  { field: "Attributes_Complexity" },
  { field: "Attributes_Balance" },
  { field: "Attributes_Sweetness" },
];

export type Coffee = {
  _id: { $oid: string };
  sourceurl: string;
  source_type: string;
  name: string;
  Taste: string[];
  Variety: string;
  Process: string;
  Country: string;
  Region: string;
  "Price / 100g in HKD": number;
  "Altitute in meters": number;
  Roast: string;
  Comments?: string[];
  "avg_rating from customer": number;
  image_url: string;
  summary_comment: string;

  Flavors_Spicy?: number;
  Flavors_Chocolaty?: number;
  Flavors_Nutty?: number;
  Flavors_Buttery?: number;
  Flavors_Fruity?: number;
  Flavors_Flowery?: number;
  Flavors_Winey?: number;
  Flavors_Earthy?: number;
  Attributes_Brightness?: number;
  Attributes_Body?: number;
  Attributes_Aroma?: number;
  Attributes_Complexity?: number;
  Attributes_Balance?: number;
  Attributes_Sweetness?: number;
};

export type CoffeeLlmResponse = {
  message: string;
  responseType: string;
  data?: Coffee[];
  end: boolean;
};

export async function getAllCoffee(): Promise<Coffee[]> {
  // TODO: handle error

  const url: URL = new URL(COFFEE_URL);
  const res = await fetch(url);
  const data = await res.json();
  return JSON.parse(data);
}

export async function getCoffeeLlmResponse(
  sessionId: string,
  query: string,
  queryType: number,
  end: boolean = true,
): Promise<CoffeeLlmResponse> {
  const url: URL = new URL(COFFEE_LLM_URL);
  url.searchParams.append("session_id", sessionId);
  url.searchParams.append("query", query);
  url.searchParams.append("query_type", queryType.toString());
  url.searchParams.append("end", end.toString());

  const res = await fetch(url);
  const data = await res.json();

  // TODO: verify response shape
  return JSON.parse(data) as CoffeeLlmResponse;
}
