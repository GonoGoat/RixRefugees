import React from 'react';
import { useSnackbar } from 'notistack';

import Friends from "./Friends";
import Users from "./Users";
import Admins from "./Admins";
import AssignmentsRecap from "./AssignmentsRecap";
import LoadingIndicatior from "../../utils/LoadingIndicator";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

function AssignmentsForm(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [admins,setAdmins] = React.useState();
    const [users,setUsers] = React.useState();
    const [friends,setFriends] = React.useState()
    const [loading,setLoading] = React.useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const stepsRef = React.useRef(null);

    const axios = require('axios');

    const steps = ["Bénévoles à assigner","Administrateurs à assigner",'Amis à assigner',"Confirmation"];

    function getStepContent() {
      switch (activeStep) {
        case 0:
          return <Users id={props.id} setUsers={(u) => setUsers(u)} ref={stepsRef}/>;
        case 1:
          return <Admins id={props.id} setAdmins={(a) => setAdmins(a)} ref={stepsRef}/>;
        case 2:
          return <Friends id={props.id} setFriends={(f) => setFriends(f)} ref={stepsRef}/>
        case 3:
          return <AssignmentsRecap users={users} admins={admins} friends={friends} />
        default:
          return 'Erreur';
      }
    }

    async function handleDelete(del) {
      if ("users" in del) {
        await axios.delete(`${process.env.REACT_APP_API}/assignments/delete/users`, {data : del.users})
        .then(res => {
          enqueueSnackbar(res.data, {variant : "info"});
        })
        .catch(err => {
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
      }
      if ("friends" in del) {
        await axios.delete(`${process.env.REACT_APP_API}/assignments/delete/friends`, {data : del.friends})
          .then(res => {
            enqueueSnackbar(res.data, {variant : "info"});
          })
          .catch(err => {
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
      }
    }

    async function handleAdmins(admin) {
      await axios.post(`${process.env.REACT_APP_API}/assignments/add/admins`, {
          admin : admin,
          sessions_tasks : props.id
        })
      .then(res => {
        enqueueSnackbar(res.data, {variant : "info"});
      })
      .catch(err => {
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
    }

    async function handleAdd(add) {
      await axios.post(`${process.env.REACT_APP_API}/assignments/add/users`, add)
      .then(res => {
        enqueueSnackbar(res.data, {variant : "info"});
      })
      .catch(err => {
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
    }

    function handleSubmit() {
      
      setLoading(true);

      let del = {};
      if (users.filter(obj => obj.state === "del").length > 0) {
        del.users = [];
        users.filter(obj => obj.state === "del").forEach(value => del.users.push(value.id))
      }
      if (friends.filter(obj => obj.state === "del").length > 0) {
        del.friends = {
          friends : [],
          users : []
        }
        friends.filter(obj => obj.state === "del").forEach(value => del.friends.friends.push(value.id))
        users.filter(obj => obj.state === "set").forEach(value => del.friends.users.push(value.id))
      }

      let add = [];
      let uAdd = false;
      if (users.filter(obj => obj.state === "add").length > 0) {
        users.filter(obj => obj.state === "add").forEach((value) => {
          add.push({
            id : value.id,
            friends : friends.filter(obj => obj.state === "set").map(f => f.id)
          });
        });
        uAdd = true;
      }
      if (friends.filter(obj => obj.state === "add").length > 0) {
        users.filter(obj => obj.state === "set").forEach((value) => {
          add.push({
            id : value.id,
            friends : friends.filter(obj => obj.state === "add").map(f => f.id)
          });
        });
        if (uAdd) {
          let id;
          let newUsers = users.filter(obj => obj.state === "add");
          let newFriends = friends.filter(obj => obj.state === "add");
          newUsers.forEach((value) => {
            id = add.findIndex(obj => obj.id === value.id)
            add[id].friends = add[id].friends.concat(newFriends.map(f => f.id))
          });
        }
      }
      let admin = [];
      if (admins.length > 0) {
        admins.forEach(value => {
          admin.push({
            id : value.id,
            friends : friends.filter(obj => obj.state === "add" || obj.state === "set").map(f => f.id)
          });
        })
      }
      let problem = false;
      if (admin.length > 0) {
        admin.forEach(obj => {
          if (obj.friends.length <= 0) {
            enqueueSnackbar("Administrateurs : Veuillez sélectionner au moins un ami à assigner", {variant : "error"});
            problem = true
          }
        })
        if (!problem) {
          handleAdmins(admin);
        }
      }
      if (Object.keys(del).length > 0) {
        handleDelete(del);
      }
      problem = false;
      if (add.length > 0) {
        add.forEach(obj => {
          if (obj.friends.length <= 0) {
            enqueueSnackbar("Bénévole : Veuillez sélectionner au moins un ami à assigner", {variant : "error"});
            problem = true
          }
        })
        if (!problem) {
          handleAdd(add);
        }
      }
      enqueueSnackbar("Le processus d'assignation est terminé !", {variant : "success"});
      setLoading(false);
    }
  
    const handleNext = () => {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      }
      else {
        stepsRef.current.setState()
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    if (loading) {
      return <LoadingIndicatior/>
    }
    else {
      return (
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <div>
              {getStepContent()}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Précédent
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default AssignmentsForm;