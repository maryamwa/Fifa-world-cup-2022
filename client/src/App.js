import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Match from "./components/match";
import Payment from "./components/Payment";
import Analytics from "./screens/Analyticsscreen";
import TicketPage from "./screens/Ticketscreen";
import Success from "./screens/Successcreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/" component={<Match />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/success" element={<Success />} />
          <Route exact path={`/:id`} element={<TicketPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
