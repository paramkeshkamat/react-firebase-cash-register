import AmountDisplay from "./components/AmountDisplay/AmountDisplay";
import AmountInput from "./components/AmountInput/AmountInput";

const App = () => {
  return (
    <div className="App">
      <h1 className="title">Cash Register</h1>
      <AmountInput />
      <AmountDisplay />
    </div>
  );
};

export default App;
