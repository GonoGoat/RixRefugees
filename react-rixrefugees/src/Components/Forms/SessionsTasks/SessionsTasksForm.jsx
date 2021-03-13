import React from "react";
import {makeStyles, StylesProvider} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import "date-fns";

import LoadingIndicator from "../../utils/LoadingIndicator";
import Sessions from '../Places/Sessions';
import Tasks from './Tasks';

const classes = makeStyles(theme => ({
    paper: {
      alignItems : 'center',
      justifyContent : 'center',
    }
  }));

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }
const useStyles = classes;

function SessionsTasksForm(props) {
    const axios = require('axios');
    const moment = require('moment');

    const date = moment().format("YYYY-MM-DD");

    const styles=useStyles();
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [formValues,setFormValues] = React.useState({
        tasks : {
            name : ''
        },
        sessions : {
            users_id : 0,
            start_date : date,
            end_date : date,
            places_availabilities_id : 0
        }
    });

    React.useEffect(() => {
        if (props.edit) {
            setFormValues({
                ...formValues,
                [props.api]: props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))]
            });
        }
    }, [props.selected,props.data])

    //Submit button for Accomodations and the others
    async function handleSubmit() {
        setLoading(true);
        if (props.edit) {
            await axios.put(`${process.env.REACT_APP_API}/${props.api}/update`, formValues[props.api])
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
        else {
            await axios.post(`${process.env.REACT_APP_API}/${props.api}/add`, formValues[props.api])
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    // Select of Accomodations
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let next = formValues[props.api];
        next[name] = value;
        setFormValues({
          ...formValues,
          [props.api]: next
        });
    };

    function displayForm() {
        switch (props.api) {
            case 'tasks':
                return (
                    <Tasks value={formValues.tasks} handleInputChange={handleInputChange}/>
                );
            case 'sessions' :
                return (
                    <Sessions value={formValues.sessions} handleInputChange={handleInputChange}/>
                )
            default:
                return ("Erreur : mauvais formulaire choisi. Veuillez réessayer. ");
        }
    };

    if (loading) {
        return (
            <div>
                <LoadingIndicator/>
            </div>
        )
    }
    else {
        return (
            <Modal
                open={true}
                onClose={() => props.stopForm()}
                className={styles.paper}
               
            >
                <form>
                    <Grid container alignItems="center" justify="center" direction="column">
                        {displayForm()}
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Envoyer
                        </Button>
                    </Grid>
                </form>
            </Modal>
        )
    }
}

export default SessionsTasksForm