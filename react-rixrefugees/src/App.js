import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Accueil, Header, About,Places,SessionsTasks,Footer} from "./Components"

import {useSelector,useDispatch} from "react-redux";


function App() {

  const userId = useSelector(state => state.user);

  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={() => <Accueil />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/manage/places" exact component={() => <Places />} />
          <Route path="/manage/sessions" exact component={() => <SessionsTasks />}/> 
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
