import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./Pages/First_page";
import SecondPage from "./Pages/Second_page";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/second" element={<SecondPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
