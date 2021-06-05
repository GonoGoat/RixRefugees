import React from "react";
import { useSnackbar } from 'notistack';

import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from "@material-ui/core/FormLabel";
import Switch from '@material-ui/core/Switch';

import axios from "../../../utils/axios";
import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function SessionsTasks (props) {
    const [friends,setFriends] = React.useState();
    const [status,setStatus] = React.useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(async () => {
        await axios.get(`${process.env.REACT_APP_API}/friends`)
        .then(res => {
            setFriends(res.data);
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

        await axios.get(`${process.env.REACT_APP_API}/status`)
        .then(res => {
            setStatus(res.data);
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
    }, [])

    if (!status || !friends) {
        return (
            <LoadingIndicator/>
        )
    }
    else {
        return (
            <React.Fragment>
                <Grid item>
                    <TextField
                        label="Date de rendez-vous"
                        type='date'
                        name="appointment"
                        value={props.value.appointment}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel>Status de l'ami</InputLabel>
                        <Select
                            value={props.value.status_id}
                            onChange={props.handleInputChange}
                            name="status_id"
                        >
                            {status.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel>Ami concerné</InputLabel>
                        <Select
                            value={props.value.friends_id}
                            onChange={props.handleInputChange}
                            name="friends_id"
                        >
                            {friends.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.fname} {obj.lname}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                {props.edit ?
                   <Grid item>
                        <FormLabel component="legend">Rendez-vous annulé ?</FormLabel>
                        <FormControlLabel
                            control={<Switch checked={props.value.iscanceled} onChange={props.handleInputChange} name="iscanceled" />}
                            label={props.value.iscanceled ? "Oui" : "Non"}
                        />
                    </Grid>
                :
                    <React.Fragment/>
                }
                <Grid item>
                    <TextField
                        name="description"
                        label="Description"
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