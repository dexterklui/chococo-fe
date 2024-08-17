import ChatBot, { Flow } from "react-chatbotify";
import { useState } from "react";
import {
  Coffee,
  CoffeeLlmResponse,
  getAllCoffee,
  getCoffeeLlmResponse,
  getMockData,
} from "../lib/data-fetch/coffee";
import { ColDef } from "./CoffeeProductTable";

function generateQueryId() {
  return crypto.randomUUID();
}

export default function ChatbotWidget({
  setCoffees,
  setColDefs,
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
          // TODO: get data from llm
          // response = await getCoffeeLlmResponse(queryId, param.userInput, 1);
          response = await getMockData();
        } catch (error) {
          console.error(error);
          param.injectMessage("Sorry, I encountered an error.");
          param.goToPath("start");
          return;
        }

        if (response.responseType === "data" && response.data)
          setCoffees(response.data);

        if (response.end) {
          param.goToPath("llmPhase1End");
        } else {
          param.goToPath("llmPhase1");
        }

        if (response.message) return response.message;
        return;
      },
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
            return "llmPhase1End";
        }
      },
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
