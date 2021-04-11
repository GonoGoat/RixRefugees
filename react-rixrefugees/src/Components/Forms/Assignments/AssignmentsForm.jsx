import React from 'react';

import LoadingIndicator from "../../utils/LoadingIndicator";
import Assignments from "./Assignments";
import Users from "./Users";
import DataList from "../../utils/DataList";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

function AssignmentsForm(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [assignments,setAssignments] = React.useState();
    const [users,setUsers] = React.useState();

    const steps = ["Personnes à assigner",'Amis à assigner',"Confirmation"];

    function getStepContent() {
        switch (activeStep) {
          case 0:
            return <Assignments id={props.id} setAssignments={(ass) => setAssignments(ass)}/>;
          case 1:
            return <Users id={props.id} setUsers={(u) => setUsers(u)}/>;
          case 2:
            return 'Yes !';
          default:
            return 'Erreur';
        }
      }
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
        </div>
      </div>
    );
}

export default AssignmentsForm;