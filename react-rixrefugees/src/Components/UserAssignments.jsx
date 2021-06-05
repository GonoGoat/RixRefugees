import React from "react";
import {useHistory } from "react-router";
import { useSnackbar } from 'notistack';
import axios from "../utils/axios";

import LoadingIndicator from "./utils/LoadingIndicator";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button"

function UserAssignments() {
    const [assignments,setAssignments] = React.useState();
    const [loading,setLoading] = React.useState(false);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/assignments/me`)
        .then(res => {
            setAssignments(res.data.sort((a, b) => b.start_date - a.start_date));
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

    function displayAssignments(value) {
        return (
            <div>
                <Typography>
                    {value.name} : {value.start_date} - {value.end_date}<br/>
                    {value.amountofpeople} bénévole(s) assigné(s) - {value.assignedfriends} amis(s) assigné(s)
                </Typography>
                <Button size="small" onClick={() => history.push(`/user/activity/${value.availabilities_id}`)}>Plus d'informations</Button>
                <Divider/>
            </div>
        )
    }

    if (loading || !assignments) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <div>
                {assignments.map(displayAssignments)}
            </div>
        )
    }
}

export default UserAssignments;