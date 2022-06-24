import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Network, CheckAlerts, SecurityAlert } from "./pages";

function App() {
  return (
    <div className="app">
      {/* <div className="width">{`Width:${window.innerWidth},
      Height:${window.innerHeight}
      `}</div> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Network />} />
          <Route path="/check-alert" element={<CheckAlerts />} />
          <Route path="/security-alert" element={<SecurityAlert />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
