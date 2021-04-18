import React from 'react';

import Friends from "./Friends";
import Users from "./Users";
import Admins from "./Admins";
import AssignmentsRecap from "./AssignmentsRecap";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

function AssignmentsForm(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [admins,setAdmins] = React.useState();
    const [users,setUsers] = React.useState();
    const [friends,setFriends] = React.useState()

    const stepsRef = React.useRef(null)

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
  
    const handleNext = () => {
      if (activeStep === steps.length - 1) {
        
      }
      else {
        stepsRef.current.setState()
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
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

export default AssignmentsForm;