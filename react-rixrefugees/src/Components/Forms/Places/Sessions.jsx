import React from "react";
import { useSnackbar } from 'notistack';
import axios from "../../../utils/axios";

import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function Sessions (props) {
    const [users,setUsers] = React.useState();
    const [places_avail,setPlaces_avail] = React.useState();

    const moment = require('moment');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/places_avail`)
        .then(res => {
            setPlaces_avail(res.data);
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

        axios.get(`${process.env.REACT_APP_API}/users/admin`)
        .then(res => {
            setUsers(res.data);
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
    }, [])

    if (!users || !places_avail) {
        return (
            <React.Fragment>
                <LoadingIndicator/>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <Grid item>
                    <FormControl>
                        <InputLabel>Coordinateur</InputLabel>
                        <Select
                            value={props.value.users_id}
                            onChange={props.handleInputChange}
                            name="users_id"
                        >
                            {users.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.username}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel>Lieux disponibles</InputLabel>
                        <Select
                            value={props.value.places_availabilities_id}
                            onChange={props.handleInputChange}
                            name="places_availabilities_id"
                        >
                            {places_avail.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.name} : {moment(obj.start_avail).format('DD/MM/YYYY HH:mm')} - {moment(obj.end_avail).format('DD/MM/YYYY HH:mm')}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField
                        label="Date de début de session"
                        type='date'
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
                        label="Date de fin de session"
                        type='date'
                        name="end_date"
                        value={props.value.end_date}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </React.Fragment>
        )
    }

}

export default Sessions;