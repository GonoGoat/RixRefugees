import React from "react";
import {useHistory } from "react-router";
import { useSnackbar } from 'notistack';
import axios from "../../utils/axios";

import LoadingIndicator from "../utils/LoadingIndicator";
import CancelButton from "../utils/Buttons/CancelButton";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import NewlineText from "../../utils/NewLineText";

function GetUserActivity() {
    const [availabilities,setAvailabilities] = React.useState();
    const [loading,setLoading] = React.useState(false);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();
    const moment = require('moment');

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/availabilities/me`)
        .then(res => {
            setAvailabilities(res.data);
            setLoading(false);
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
    },[])

    async function cancel() {
        setLoading(true);
        await axios.put(`${process.env.REACT_APP_API}/availabilities/cancel`, availabilities.id)
        .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            window.location.reload();
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

    function getState(value) {
        if (value.iscanceled) return "Annulée";
        if (value.avail) return "Assignée";
        if (moment(value.start_date).isBefore(moment())) return "En cours de traitement";
        return 'Non sélectionné';
    }
    

    function displayAvailabilities(value,index) {
        return (
            <div>
                <Typography>
                    Proposition n°{value.id}<br/>
                    Effectuée le {value.updatedate}<br/>
                    Etat : {getState(value)}<br/>
                    Description : <NewlineText text={value.description}/>
                </Typography>
                <Button size="small" onClick={() => history.push(`/user/activity/${value.id}`)}>Plus d'informations</Button>
                <CancelButton disabled={false} cancel={() => cancel()}/>
                <Divider/>
            </div>
        )
    }

    if (loading || !availabilities) {
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