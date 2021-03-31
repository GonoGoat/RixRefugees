import React from "react";
import { useParams } from 'react-router-dom';

import DataList from './utils/DataList';
import UserActivityForm from "./Forms/UserActivity/UserActivityForm";
import LoadingIndicator from "./utils/LoadingIndicator";

import {sessionsTasksInfoDataListKeys} from '../utils/DataListKeys/sessionsTasksInfo'

import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import SessionsTasks from "./Forms/SessionsTasks/SessionsTasks";
import Button from '@material-ui/core/Button';

function AddUserActivity() {

    const axios = require('axios');
    const moment = require('moment');

    const dateTime = moment().format("YYYY-MM-DDTHH:mm");
    
    const [formValues,setFormValues] = React.useState({
        availabilities : {
            description : '',
            users_id : 1,
            sessions_tasks_id : useParams().id,
            iscanceled : false
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
    const [loading, setLoading] = React.useState(false);

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
        setLoading(true);
        if (!formValues.availabilities.sessions_tasks_id) {
            await axios.post(`${process.env.REACT_APP_API}/sessions_tasks/add`, formValues.sessions_tasks)
            .then(res => {
                let next = formValues.availabilities;
                next.sessions_tasks_id = res.data.data;
                console.log(res.data);
                setFormValues({
                    ...formValues,
                    availabilities : next
                });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
        await axios.post(`${process.env.REACT_APP_API}/availabilities/add`, formValues.availabilities)
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
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
                    <SessionsTasks value={formValues.sessions_tasks} handleInputChange={handleSessionsTasksChange}/>
                    :
                    <React.Fragment>
                        <Typography>Vous êtes en train de postuler pour la tâche suivante :</Typography>
                        <DataList api={formValues.availabilities.sessions_tasks_id} keys={sessionsTasksInfoDataListKeys}/>
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