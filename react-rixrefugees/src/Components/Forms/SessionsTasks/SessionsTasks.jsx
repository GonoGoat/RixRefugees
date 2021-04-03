import React from "react";

import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function SessionsTasks (props) {
    const [tasks,setTasks] = React.useState();
    const [sessions,setSessions] = React.useState();

    const axios = require('axios');
    const moment = require('moment');

    React.useEffect(() => {
        if (props.api) {
            axios.get(`${process.env.REACT_APP_API}/tasks`)
            .then(res => {
                setTasks(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
            axios.get(`${process.env.REACT_APP_API}/sessions/available`)
            .then(res => {
                setSessions(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    if ((!tasks && props.api) || !sessions) {
        return (
            <React.Fragment>
                <LoadingIndicator/>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                {props.api ?
                    <Grid item>
                        <FormControl>
                            <InputLabel>Nom de la tâche</InputLabel>
                            <Select
                                value={props.value.tasks_id}
                                onChange={props.handleInputChange}
                                name="tasks_id"
                            >
                                {tasks.map((obj) => {
                                    return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                :
                    <Grid item>
                        <FormControl>
                            <InputLabel>Session concernée</InputLabel>
                            <Select
                                value={props.value.sessions_id}
                                onChange={props.handleInputChange}
                                name="sessions_id"
                            >
                                {sessions.map((obj) => {
                                    return <MenuItem value={obj.id}>{obj.username} à "{obj.name}" : {moment(obj.start_date).format('DD/MM/YYYY')} - {moment(obj.end_date).format('DD/MM/YYYY')}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                }                
                <Grid item>
                    <TextField
                        label="Date de début de tâche"
                        type='datetime-local'
                        name="start_date"
                        value={props.value.start_date}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Date de fin de tâche"
                        type='datetime-local'
                        name="end_date"
                        value={props.value.end_date}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Nombre de bénévole à assigner"
                        type='number'
                        name="amountofpeople"
                        value={props.value.amountofpeople}
                        onChange={props.handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="description"
                        label="Description de la tâche de la session"
                        type="text"
                        value={props.value.description}
                        onChange={props.handleInputChange}
                        multiline
                        rows={5}
                    />
                </Grid>
            </React.Fragment>
        )
    }
}

export default SessionsTasks;