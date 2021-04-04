import React from "react";
import {useHistory } from "react-router";

import LoadingIndicator from "../utils/LoadingIndicator";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button"

function GetUserActivity() {
    const [user,setUser] = React.useState(1);
    const [availabilities,setAvailabilities] = React.useState();

    const axios = require('axios');
    const history = useHistory();

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/availabilities/user/${user}`)
        .then(res => {
            setAvailabilities(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    },[])
    

    function displayAvailabilities(value,index) {
        return (
            <div>
                <Typography>
                    Proposition n°{value.id}<br/>
                    Effectuée le {value.updatedate}<br/>
                    Etat : {value.iscanceled ? "Annulée" : "En cours"}<br/>
                    Description : {value.description}
                </Typography>
                <Divider/>
            </div>
        )
    }

    if (!availabilities) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <div>
                {availabilities.map(displayAvailabilities)}
                <br/>
                <div>
                    <Typography>Envie de vous rendre disponible pour une nouvelle activité ? </Typography>
                    <Button size="small" onClick={() => history.push('/user/activity/add')}>Cliquez ici !</Button>
                </div>
            </div>
        )
    }
}

export default GetUserActivity;