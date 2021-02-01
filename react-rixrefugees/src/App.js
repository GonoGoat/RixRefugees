import React from "react";
import './App.css';
import 'fontsource-roboto';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Accueil, Header, About} from "./Components"

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={() => <Accueil />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
