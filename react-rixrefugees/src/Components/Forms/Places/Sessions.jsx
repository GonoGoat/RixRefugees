import React from "react";
import {Grid,FormControl,MenuItem,Select,InputLabel, TextField} from "@material-ui/core";
import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function Sessions (props) {
    const [users,setUsers] = React.useState();
    const [places_avail,setPlaces_avail] = React.useState();

    const axios = require('axios');
    const moment = require('moment');

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/places_avail`)
        .then(res => {
            setPlaces_avail(res.data);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(`${process.env.REACT_APP_API}/users/admin`)
        .then(res => {
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err);
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
                                return <MenuItem value={obj.id}>{obj.name} : {moment(obj.start_avail).format('DD/MM/YYYY hh:mm')} - {moment(obj.end_avail).format('DD/MM/YYYY hh:mm')}</MenuItem>
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