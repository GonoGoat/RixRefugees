import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import "date-fns";

import LoadingIndicator from "../../utils/LoadingIndicator";
import Sessions from '../Places/Sessions';
import Tasks from './Tasks';
import SessionsTasks from './SessionsTasks';

import check from "../../../utils/FormValidations/validators"

const classes = makeStyles({
    window : {
        height : 500,
    },
  });
const useStyles = classes;

function SessionsTasksForm(props) {
    const axios = require('axios');
    const moment = require('moment');

    const date = moment().format("YYYY-MM-DD");
    const dateTime = moment().format("YYYY-MM-DDTHH:mm");

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const styles=useStyles();
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
        },
        sessions_tasks : {
            description : '',
            amountofpeople : 0,
            start_date : dateTime,
            end_date : dateTime,
            tasks_id : 0,
            sessions_id : 0
        }
    });

    React.useEffect(() => {
        if (props.edit && props.api === "sessions_tasks") {
            let sess = props.data[props.data.findIndex(obj => obj.id === parseInt(props.selected[0]))];
            axios.get(`${process.env.REACT_APP_API}/sessions_tasks/desc/${sess.id}`)
            .then(res => {
                sess.description = res.data.description
            })
            .catch(err => {
                console.log(err);
            });
            setFormValues({
                ...formValues,
                [props.api]: sess
            });
        }
        else {
            let next = formValues[props.api];
            next.sessions_id = props.sessions;
            setFormValues({
            ...formValues,
            [props.api]: next
            });
        }
    }, [props.selected,props.data,props.sessions])

    //Submit button for Accomodations and the others
    async function handleSubmit() {
        let values;
        switch (props.api) {
            case 'tasks':
                values = check.checkForm([
                    check.name(formValues.tasks.name)
                ]);
                break;
            case 'sessions' :
                values = check.checkForm([
                    check.dates(formValues.sessions.start_date,formValues.sessions.end_date),
                    check.users(formValues.sessions.users_id),
                    check.places_avail(formValues.sessions.places_availabilities_id)
                ]);
                break;
            case 'sessions_tasks' :
                values = check.checkForm([
                    check.amountOfPeople(formValues.sessions_tasks.amountofpeople),
                    check.tasks(formValues.sessions_tasks.tasks_id),
                    check.sessions(formValues.sessions_tasks.sessions_id)
                ]);
                break;
            default:
                values = ["Formulaire invalide."]
                break;
        }
        if (values === true) {
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
        else {
            closeSnackbar();
            values.filter(val => val !== true).forEach(obj => {
                enqueueSnackbar(obj, {variant : "error"});
            })
        }
    }

    // Select of Accomodations
    const handleInputChange = (e) => {
        const {checked, name, value } = e.target;
        let next = formValues[props.api];
        if (checked) {
            next[name] = checked;
        }
        else {
            next[name] = value;
        }
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
            case 'sessions_tasks' :
                return (
                    <SessionsTasks api={true} edit={props.edit} value={formValues.sessions_tasks} handleInputChange={handleInputChange}/>
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
            <Drawer anchor='bottom' open={true} onClose={() => props.stopForm()}>
                <form className={styles.window}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        {displayForm()}
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Envoyer
                        </Button>
                    </Grid>
                </form>
            </Drawer>
        )
    }
}

export default SessionsTasksForm