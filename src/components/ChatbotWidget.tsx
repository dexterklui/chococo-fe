import ChatBot, { Flow } from "react-chatbotify";
import { useState } from "react";
import {
  Coffee,
  CoffeeLlmResponse,
  getCoffeeLlmResponse,
} from "../lib/data-fetch/coffee";
import { ColDef } from "./CoffeeProductTable";

function generateQueryId() {
  return crypto.randomUUID();
}

export default function ChatbotWidget({
  setCoffees,
  // setColDefs,
}: {
  setCoffees: React.Dispatch<React.SetStateAction<Coffee[]>>;
  setColDefs: React.Dispatch<React.SetStateAction<ColDef[]>>;
}) {
  const [queryId, setQueryId] = useState("");

  const flow: Flow = {
    start: {
      function: () => setQueryId(generateQueryId()),
      message: "Hello, how would you like to filter the data?",
      path: "llmPhase1",
      // TODO: not filter data, straight to plotting graph
    },
    llmPhase1: {
      message: async (param) => {
        let response: CoffeeLlmResponse;
        try {
          response = await getCoffeeLlmResponse(queryId, param.userInput, 1);
          // response = await getMockResponse();
        } catch (error) {
          console.error(error, queryId);
          param.injectMessage("Sorry, I encountered an error.");
          param.goToPath("start");
          return;
        }

        if (response.responseType === "data" && response.data) {
          console.log(typeof response.data, ":", response.data);
          const data =
            typeof response.data == "string"
              ? JSON.parse(response.data)
              : response.data;
          setCoffees(data);
        }

        if (response.end) {
          param.goToPath("llmPhase1End");
        }

        if (response.message) return response.message;
        return;
      },
      path: "llmPhase1",
    },
    llmPhase1End: {
      message:
        "Would you like to filter for new data, or plot a graph from current data?",
      options: ["filter for new data", "plot a graph"],
      chatDisabled: true,
      path: (param) => {
        switch (param.userInput) {
          case "filter for new data":
            return "start";
          case "plot a graph":
            // TODO: implement llmPhase2
            param.injectMessage("Sorry, not implemented yet.");
            return "start";
        }
      },
    },
    llmPlotData: {
      message: "Which graph would you like to plot?",
      options: ["bar chart", "scatter plot", "line chart"],
    },
  };

  return (
    <ChatBot
      themes={{ id: "simple_blue" }}
      flow={flow}
      settings={{
        // general: { embedded: true },
        chatWindow: { showScrollbar: true },
      }}
      styles={{ chatWindowStyle: { width: "70vw" } }}
    />
  );
}

// function getMockResponse(): Promise<CoffeeLlmResponse> {
//   return Promise.resolve({
//     message: "",
//     responseType: "data",
//     end: true,
//     data: [
//       {
//         _id: "66c0880e0e9bc457a1801a11",
//         sourceurl: "https://example.com",
//         source_type: "Artisan",
//         name: "Kenyan AA",
//         Taste: ["Berry", "Citrus"],
//         Variety: "SL28, SL34",
//         Process: "Washed",
//         Country: "Kenya",
//         Region: "Nyeri",
//         "Price / 100g in HKD": 60,
//         "Altitute in meters": 1700,
//         Roast: "Light-Medium",
//         Flavors_Spicy: 1,
//         Flavors_Choclaty: 1,
//         Flavors_Nutty: 1,
//         Flavors_Buttery: 2,
//         Flavors_Fruity: 5,
//         Flavors_Flowery: 4,
//         Flavors_Winey: 3,
//         Flavors_Earthy: 1,
//         Attributes_Brightness: 5,
//         Attributes_Body: 3,
//         Attributes_Aroma: 5,
//         Attributes_Complexity: 4,
//         Attributes_Balance: 5,
//         Attributes_Sweetness: 4,
//         "avg_rating from customer": 4.8,
//         image_url: "https://example.com/image3.jpg",
//         summary_comment:
//           "The coffee bean has intense fruity notes and balanced acidity.",
//       },
//     ],
//   });
// }
