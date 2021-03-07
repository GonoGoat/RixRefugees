import React from "react";
import './App.css';
import 'fontsource-roboto';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Accueil, Header, About,Places,SessionsTasks} from "./Components"

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={() => <Accueil />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/manage/places" exact component={() => <Places />} />
          <Route path="/manage/sessions" exact component={() => <SessionsTasks />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
