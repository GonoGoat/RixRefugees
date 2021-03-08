import React from "react";
import './App.css';
import 'fontsource-roboto';
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
          {userId === 2 ?
          <React.Fragment>
            <Route path="/manage/places" exact component={() => <Places />} />
            <Route path="/manage/sessions" exact component={() => <SessionsTasks />}/> 
          </React.Fragment>
          : ''
        }
        </Switch>

      </Router>
    </div>
  );
}

export default App;
