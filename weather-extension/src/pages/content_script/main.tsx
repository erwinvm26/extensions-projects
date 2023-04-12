import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

const root = document.createElement("div");
root.id = "extension-root";

const body = document.querySelector("body");
if (body) {
  body.prepend(root);
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
