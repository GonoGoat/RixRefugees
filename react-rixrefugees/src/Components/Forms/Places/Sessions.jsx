import React from "react";
import {Grid,FormControl,MenuItem,Select,InputLabel, TextField} from "@material-ui/core";
import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function Sessions (props) {
    const [users,setUsers] = React.useState();
    const [places_avail,setPlaces_avail] = React.useState();

    const axios = require('axios');

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/places_availabilities`)
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
    

}

export default Sessions;