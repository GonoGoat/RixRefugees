import React from "react";
import {useHistory } from "react-router";
import { useSnackbar } from 'notistack';
import axios from "../utils/axios";

import LoadingIndicator from "./utils/LoadingIndicator";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
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
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>
                            {value.name} : {value.start_date} - {value.end_date}<br/>
                            {value.amountofpeople} bénévole(s) assigné(s)
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button size="small" onClick={() => history.push(`/user/activity/${value.availabilities_id}`)}>Plus d'informations</Button>
                    </Grid>
                </Grid>
                <Divider/>
            </Grid>
        )
    }

    if (loading || !assignments) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <Container>
                <Grid container>
                    {assignments.map(displayAssignments)}
                </Grid>
            </Container>
        )
    }
}

export default UserAssignments;