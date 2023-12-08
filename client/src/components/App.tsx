import React from "react";
import { Header } from "./header";
import { RouterProvider, Routes } from "react-router-dom";
import { Navigation } from "./routes";

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
    </div>
  );
}

export default App;
