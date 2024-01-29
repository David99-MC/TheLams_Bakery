import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const bodyObj = { name };
      await fetch("http://localhost:5000/bread", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyObj),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Product name: </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
