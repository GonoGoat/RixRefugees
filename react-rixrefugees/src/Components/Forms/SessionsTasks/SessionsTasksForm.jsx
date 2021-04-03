import React from "react";
import {makeStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import "date-fns";

import LoadingIndicator from "../../utils/LoadingIndicator";
import Sessions from '../Places/Sessions';
import Tasks from './Tasks';
import SessionsTasks from './SessionsTasks';

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
            isfromadmin : true,
            description : '',
            amountofpeople : 0,
            start_date : dateTime,
            end_date : dateTime,
            tasks_id : 0,
            sessions_id : 0
        }
    });

    React.useEffect(() => {
        if (props.edit) {
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
            case 'sessions_tasks' :
                return (
                    <SessionsTasks api={true} value={formValues.sessions_tasks} handleInputChange={handleInputChange}/>
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