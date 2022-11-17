import { SOS } from "./components/SOS";

function App() {
  return (
    <div>
      <SOS
        onSOS={() => {
          alert("긴급사태!");
        }}
      ></SOS>
    </div>
  );
}

export default App;
