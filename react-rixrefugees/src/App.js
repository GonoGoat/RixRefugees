import React from "react";
import { useSnackbar } from 'notistack';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Accueil, Header, About,Places,SessionsTasks,Footer,Assignments,UserAssignments,Friends,Login,Register,PasswordReset,NewPassword} from "./Components";
import AddUserActivity from "./Components/UserActivity/AddUserActivity";
import GetUserActivity from './Components/UserActivity/GetUserActivity'
import RetrieveAndChangeUserActivity from './Components/UserActivity/RetrieveAndChangeUserActivity';

import {useSelector,useDispatch} from "react-redux";
import {switchUser} from "./redux/Actions/index";
import axios from "./utils/axios"


function App() {

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(async () => {
    if (localStorage.getItem("rixrefugees-message")) {
      enqueueSnackbar(localStorage.getItem("rixrefugees-message"), {variant : "success"});
      localStorage.removeItem("rixrefugees-message");
    }

    await axios.get(`${process.env.REACT_APP_API}/users/current`)
      .then(res => {
        if (res.data.loggedIn) {
          dispatch(switchUser({user : (res.data.isadmin ? 2 : 1)}))
        }
        else {
          dispatch(switchUser({user : 0}))
        }
      })
      .catch(err => {
        closeSnackbar();
        if (err.response) {
            enqueueSnackbar(err.response.data, {variant : "error"});
        }
        else if (err.request) {
            enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
        } 
        else {
            enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
        }
      });
  },[])

  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={() => <Accueil />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/reset" exact component={() => <PasswordReset />} />
          <Route path="/reset/:token" exact component={() => <NewPassword />} />
          <Route path="/user/assignments" exact component={() => <UserAssignments />} />
          <Route path="/user/activity" exact component={() => <GetUserActivity />} />
          <Route path="/user/activity/add" exact component={() => <AddUserActivity />} />
          <Route path="/user/activity/add/:id" exact component={() => <AddUserActivity />} />
          <Route path="/user/activity/:id" exact component={() => <RetrieveAndChangeUserActivity />} />
          <Route path="/manage/places" exact component={() => <Places />} />
          <Route path="/manage/sessions" exact component={() => <SessionsTasks />}/>
          <Route path="/manage/assignments" exact component={() => <Assignments />}/>
          <Route path="/manage/friends" exact component={() => <Friends />}/>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
