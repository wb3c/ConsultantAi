import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Root from "./components/Root";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
