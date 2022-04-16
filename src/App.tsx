import React, { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const [counter, setCounter] = useState(1);

  function handleButtonClick() {
    setCounter(counter + 1);
    console.log(counter);
  }

  return (
    <>
      <Header title="Pagina Inicial" />
      <h1>Hello dev</h1>
      <p> {counter} </p>
      <button onClick={handleButtonClick}>Incrementar</button>
    </>
  );
}

export default App;
