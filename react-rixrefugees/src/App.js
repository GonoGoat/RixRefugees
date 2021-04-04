import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Accueil, Header, About,Places,SessionsTasks,Footer} from "./Components";
import AddUserActivity from "./Components/UserActivity/AddUserActivity";
import GetUserActivity from './Components/UserActivity/GetUserActivity'
import RetrieveAndChangeUserActivity from './Components/UserActivity/RetrieveAndChangeUserActivity';

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
          <Route path="/user/activity" exact component={() => <GetUserActivity />} />
          <Route path="/user/activity/add" exact component={() => <AddUserActivity />} />
          <Route path="/user/activity/add/:id" exact component={() => <AddUserActivity />} />
          <Route path="/user/activity/:id" exact component={() => <RetrieveAndChangeUserActivity />} />
          <Route path="/manage/places" exact component={() => <Places />} />
          <Route path="/manage/sessions" exact component={() => <SessionsTasks />}/> 
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
