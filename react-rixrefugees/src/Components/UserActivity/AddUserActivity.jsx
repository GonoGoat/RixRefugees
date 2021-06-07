import React from "react";
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from "../../utils/axios";

import DataList from '../utils/DataList';
import UserActivityForm from "../Forms/UserActivity/UserActivityForm";
import LoadingIndicator from "../utils/LoadingIndicator";
import SessionsTasks from "../Forms/SessionsTasks/SessionsTasks";
import Tasks from "../Forms/SessionsTasks/Tasks";

import {sessionsTasksInfoDataListKeys} from '../../utils/DataListKeys/sessionsTasksInfo';

import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import check from "../../utils/FormValidations/validators"

function AddUserActivity() {
    const moment = require('moment');

    const dateTime = moment().format("YYYY-MM-DDTHH:mm");
    
    const [formValues,setFormValues] = React.useState({
        tasks : {
            name : ''
        },
        availabilities : {
            description : '',
            sessions_tasks_id : useParams().id,
        },
        sessions_tasks : {
            description : '',
            amountofpeople : 0,
            start_date : dateTime,
            end_date : dateTime,
            sessions_id : 0
        }
    });
    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleTasksChange = (e) => {
        const { name, value } = e.target;
        let next = formValues.tasks;
        next[name] = value;
        setFormValues({
          ...formValues,
          tasks: next
        });
    };

    const handleAvailabilitiesChange = (e) => {
        const { name, value } = e.target;
        let next = formValues.availabilities;
        next[name] = value;
        setFormValues({
          ...formValues,
          availabilities: next
        });
    };

    const handleSessionsTasksChange = (e) => {
        const { name, value } = e.target;
        let next = formValues.sessions_tasks
        next[name] = value;
        setFormValues({
          ...formValues,
          sessions_tasks: next
        });
    };

    async function handleSubmit() {
        if (!formValues.availabilities.sessions_tasks_id) {
            let values = check.checkForm([
                check.name(formValues.tasks.name),
                check.dates(formValues.sessions_tasks.start_date,formValues.sessions_tasks.end_date),
                check.users(formValues.sessions_tasks.users_id),
                check.places_avail(formValues.sessions_tasks.places_availabilities_id),
                check.amountOfPeople(formValues.sessions_tasks.amountofpeople),
                check.tasks(formValues.sessions_tasks.tasks_id),
                check.sessions(formValues.sessions_tasks.sessions_id)
            ])
            if (values === true) {
                setLoading(true);
                await axios.post(`${process.env.REACT_APP_API}/availabilities/add/new`, formValues)
                .then(res => {
                    localStorage.setItem("rixrefugees-message",res.data);
                    window.location.href = "/";
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
                    setLoading(false);
                });
            }
            else {
                closeSnackbar();
                values.filter(val => val !== true).forEach(obj => {
                    enqueueSnackbar(obj, {variant : "error"});
                })
            }
        }
        else {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_API}/availabilities/add`, formValues.availabilities)
            .then(res => {
                localStorage.setItem("rixrefugees-message",res.data);
                window.location.href = "/";
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
                setLoading(false);
            });
        }
    }

    if (loading) {
        return (
            <div>
                <LoadingIndicator/>
            </div>
        )
    }
    else {
        return (
            <div>
                {!formValues.availabilities.sessions_tasks_id ?
                    <React.Fragment>
                        <Tasks value={formValues.tasks} handleInputChange={handleTasksChange}/>
                        <SessionsTasks edit={false} api={false} value={formValues.sessions_tasks} handleInputChange={handleSessionsTasksChange}/>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Typography>Vous êtes en train de postuler pour la tâche suivante :</Typography>
                        <DataList api={`/sessions_tasks/${formValues.availabilities.sessions_tasks_id}`} keys={sessionsTasksInfoDataListKeys}/>
                    </React.Fragment>
                }
                <Divider/>
                <UserActivityForm value={formValues.availabilities} handleInputChange={handleAvailabilitiesChange}/>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Envoyer
                </Button>
            </div>
        )
    }
}

export default AddUserActivity;