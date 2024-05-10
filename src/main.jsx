import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/Errorboundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);
