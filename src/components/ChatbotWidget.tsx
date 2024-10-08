import ChatBot, { Flow } from "react-chatbotify";
import { useState } from "react";
import {
  Coffee,
  CoffeeLlmResponse,
  getCoffeeLlmResponse,
} from "../lib/data-fetch/coffee";
import LlmGraph from "./graphs/LlmGraph";

function generateQueryId() {
  return crypto.randomUUID();
}

export default function ChatbotWidget({
  setCoffees,
  // setColDefs,
  coffees,
  allCoffees,
}: {
  setCoffees: React.Dispatch<React.SetStateAction<Coffee[]>>;
  // setColDefs: React.Dispatch<React.SetStateAction<ColDef[]>>;
  coffees: Coffee[];
  allCoffees: Coffee[];
}) {
  const [queryId, setQueryId] = useState("");
  const [end, setEnd] = useState(false);

  const flow: Flow = {
    start: {
      function: () => {
        setQueryId(generateQueryId());
        setEnd(false);
      },
      message: "Hello, I'm the coffee bot. How can I help you today?",
      options: [
        "Filter data",
        "Plot a graph",
        "Give me coffee bean product recommendations",
        "Show me similar products with another product",
      ],
      path: (param) => {
        switch (param.userInput) {
          case "Filter data":
            return "filterStart";
          case "Plot a graph":
            return "llmPlotDataStart";
          case "Give me coffee bean product recommendations":
            return "llmRecommendStart";
          case "Show me similar products with another product":
            return "llmSimilarityRecommendStart";
        }
      },
      chatDisabled: true,
    },

    filterStart: {
      message: "How would you like to filter the data?",
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        return "llmPhase1";
      },
    },

    llmPhase1: {
      message: async (param) => {
        let response: CoffeeLlmResponse;
        try {
          response = await getCoffeeLlmResponse(
            queryId,
            param.userInput,
            1,
            !end,
          );
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
          setEnd(true);
          param.goToPath("llmPhase1End");
        } else {
          setEnd(false);
        }

        if (response.message) return response.message;
        return;
      },
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        return "llmPhase1";
      },
    },

    llmPhase1End: {
      function: () => setEnd(false),
      message:
        "Sure, I have filtered the data and update the table and catalogue. Would you like to start again, or plot a graph from current data?",
      options: ["start again", "plot a graph"],
      chatDisabled: true,
      path: (param) => {
        switch (param.userInput) {
          case "start again":
            return "start";
          case "plot a graph":
            return "llmPlotDataStart";
        }
      },
    },

    llmPlotDataStart: {
      function: (param) => {
        if (param.userInput === "bar charts showing price distribution by region") {
          param.injectMessage(<img src="/price_distribution_by_region.png" height="480px" />)
        }
        if (param.userInput === "bar chart showing top 10 countries by coffee count") {
          param.injectMessage(<img src="/histogram_by_countries.png" height="480px" />)
        }
        setEnd(false)
      },
      message:
        "Can you tell me the type of graph you want to plot, and what columns for the axises? (NOW only support bar graph)",
      options: ["start over", "bar charts showing price distribution by region", "bar chart showing top 10 countries by coffee count"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        if (param.userInput === "bar charts showing price distribution by region") return "llmPlotDataEnd";
        if (param.userInput === "bar chart showing top 10 countries by coffee count") return "llmPlotDataEnd";
        return "llmPlotDataMain";
      },
    },

    llmPlotDataMain: {
      message: async (param) => {
        let response: CoffeeLlmResponse;
        try {
          response = await getCoffeeLlmResponse(queryId, param.userInput, 2);
        } catch (error) {
          console.error(error, queryId);
          param.injectMessage("Sorry, I encountered an error.");
          param.goToPath("start");
          return;
        }

        // if (response.responseType === "data") console.log("received data");
        if (response.responseType === "data" && response.data) {
          const data =
            typeof response.data == "string"
              ? JSON.parse(response.data)
              : response.data;
          console.log(typeof data, ":", data);
          if (data.graph_type !== "Bar")
            param.injectMessage("Sorry, only support bar graph for now.");
          param.injectMessage(<LlmGraph data={coffees} schema={data} />);
        }

        if (response.end) {
          setEnd(true);
          param.goToPath("llmPlotDataEnd");
        } else {
          setEnd(false);
        }

        if (response.message) return response.message;
        return;
      },
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        return "llmPlotDataMain";
      },
    },

    llmPlotDataEnd: {
      function: () => setEnd(false),
      message:
        "Do you want to start again, or make another plot for current selection of data?",
      options: ["start again", "plot graph"],
      path: (param) => {
        switch (param.userInput) {
          case "start again":
            return "start";
          case "plot graph":
            return "llmPlotDataStart";
        }
      },
    },

    llmRecommendStart: {
      message: `Sure, what criteria do you have in mind, like which flavor do you like?
E.g. "requirements: very fruity, blueberry taste"`,
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        return "llmRecommendMain";
      },
    },

    llmRecommendMain: {
      message: async (param) => {
        let response: CoffeeLlmResponse;
        try {
          response = await getCoffeeLlmResponse(queryId, param.userInput, 5);
        } catch (error) {
          console.error(error, queryId);
          param.injectMessage("Sorry, I encountered an error.");
          param.goToPath("start");
          return;
        }

        // if (response.responseType === "data") console.log("received data");
        if (response.responseType === "data" && response.data) {
          const data =
            typeof response.data == "string"
              ? JSON.parse(response.data)
              : response.data;
          console.log(typeof data, ":", data);
          setCoffees(data);
        }

        if (response.end) {
          setEnd(true);
          param.goToPath("llmRecommendEnd");
        } else {
          setEnd(false);
        }

        // Suppress message if its a data response for this
        // if (response.responseType == "message" && response.message)
        if (response.message) return response.message;
        return;
      },
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        return "llmPlotDataMain";
      },
    },

    llmRecommendEnd: {
      message:
        "Sure, here I have filtered the data with my recommendations. Please check my selections in the table or catalogue",
      transition: { duration: 1000 },
      path: "start",
    },

    llmSimilarityRecommendStart: {
      message: `Sure, can you copy one product name here such that I can recommend similar products?"`,
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        const filter = allCoffees.filter(
          (coffee) => coffee.name === param.userInput,
        );
        if (filter.length > 0) return "llmSimilarityRecommendMain";
        return "llmSimilarityRecommendUnfoundName";
      },
    },

    llmSimilarityRecommendUnfoundName: {
      message: `Sorry, couldn't find this exact product name, can you copy one product name here such that I can recommend similar products?"`,
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        const filter = allCoffees.filter(
          (coffee) => coffee.name === param.userInput,
        );
        if (filter.length > 0) return "llmSimilarityRecommendMain";
        return "llmSimilarityRecommendRepeat";
      },
    },

    llmSimilarityRecommendMain: {
      message: async (param) => {
        let response: CoffeeLlmResponse;
        try {
          response = await getCoffeeLlmResponse(queryId, param.userInput, 6);
        } catch (error) {
          console.error(error, queryId);
          param.injectMessage("Sorry, I encountered an error.");
          param.goToPath("start");
          return;
        }

        // if (response.responseType === "data") console.log("received data");
        if (response.responseType === "data" && response.data) {
          const data =
            typeof response.data == "string"
              ? JSON.parse(response.data)
              : response.data;
          console.log(typeof data, ":", data);
          setCoffees(data);
        }

        if (response.end) {
          setEnd(true);
          param.goToPath("llmSimilarityRecommendEnd");
        } else {
          setEnd(false);
        }

        if (response.message) return response.message;
        return;
      },
      options: ["start over"],
      path: (param) => {
        if (param.userInput === "start over") return "start";
        return "llmSimilarityRecommendMain";
      },
    },

    llmSimilarityRecommendEnd: {
      message:
        "Sure, here I have filtered the data with my recommendations. Please check my selections in the table or catalogue",
      transition: { duration: 1000 },
      path: "start",
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
      styles={{ chatWindowStyle: { width: "70vw", height: "80vh" } }}
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
