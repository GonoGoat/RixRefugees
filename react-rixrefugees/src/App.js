import React from "react";
import { useSnackbar } from 'notistack';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Accueil, Header, About,Places,SessionsTasks,Footer,Assignments,UserAssignments,Friends,Login,Register,PasswordReset,NewPassword, UserProfile, Registrations, MakeDonations, ManageDonations,Error} from "./Components";
import AddUserActivity from "./Components/UserActivity/AddUserActivity";
import GetUserActivity from './Components/UserActivity/GetUserActivity'
import RetrieveAndChangeUserActivity from './Components/UserActivity/RetrieveAndChangeUserActivity';
import DeleteUser from "./Components/UserProfile/DeleteUser";
import EditUser from  "./Components/UserProfile/EditUser";
import PasswordChange from  "./Components/UserProfile/PasswordChange";

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

  function getPerm(val) {
    switch (val) {
      case 0 :
        return userId === 0;
      case 1 :
        return userId > 0;
      case 2 :
        return userId === 2
      default :
        return true
    }
  }

  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route path="/" exact component={() => <Accueil />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/donations" exact component={() => <MakeDonations />} />

          <Route path="/login" exact component={() => getPerm(0) ? <Login /> : <Error/>} />
          <Route path="/register" exact component={() => getPerm(0) ? <Register /> : <Error/>} />
          <Route path="/reset" exact component={() => getPerm(0) ? <PasswordReset /> : <Error/>} />
          <Route path="/reset/:token" exact component={() => getPerm(0) ? <NewPassword /> : <Error/>} />

          <Route path="/user/profile" exact component={() => getPerm(1) ? <UserProfile /> : <Error/>} />
          <Route path="/user/profile/edit" exact component={() => getPerm(1) ? <EditUser /> : <Error/>} />
          <Route path="/user/profile/delete" exact component={() => getPerm(1) ? <DeleteUser /> : <Error/>} />
          <Route path="/user/profile/password" exact component={() => getPerm(1) ? <PasswordChange /> : <Error/>} />
          <Route path="/user/assignments" exact component={() => getPerm(1) ? <UserAssignments /> : <Error/>} />
          <Route path="/user/activity" exact component={() => getPerm(1) ? <GetUserActivity /> : <Error/>} />
          <Route path="/user/activity/add" exact component={() => getPerm(1) ? <AddUserActivity /> : <Error/>} />
          <Route path="/user/activity/add/:id" exact component={() => getPerm(1) ? <AddUserActivity /> : <Error/>} />
          <Route path="/user/activity/:id" exact component={() => getPerm(1) ? <RetrieveAndChangeUserActivity /> : <Error/>} />

          <Route path="/manage/places" exact component={() => getPerm(2) ? <Places /> : <Error/>} />
          <Route path="/manage/sessions" exact component={() => getPerm(2) ? <SessionsTasks /> : <Error/>}/>
          <Route path="/manage/assignments" exact component={() => getPerm(2) ? <Assignments /> : <Error/>}/>
          <Route path="/manage/friends" exact component={() => getPerm(2) ? <Friends /> : <Error/>}/>
          <Route path="/manage/users" exact component={() => getPerm(2) ? <Registrations /> : <Error/>}/>
          <Route path="/manage/donations" exact component={() => getPerm(2) ? <ManageDonations /> : <Error/>}/>

          <Route component={() => <Error/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
