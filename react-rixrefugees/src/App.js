import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Accueil from "./Components/Accueil"
import Header from "./Components/Header"

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={() => <Accueil />} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
