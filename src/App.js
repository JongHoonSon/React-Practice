import { useState } from "react";
import { MyForm } from "./components/MyForm";

function App() {
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      <h1>{username}님 환영합니다.</h1>
      <MyForm
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></MyForm>
    </div>
  );
}

export default App;
