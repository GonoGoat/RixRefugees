import React from "react";

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

function AssignmentsRecap(props) {

    function getAction(str) {
        switch(str) {
            case 'add':
                return 'Ajout'
            case 'set':
                return 'Inchangé'
            case 'del':
                return 'Suppression'
            default:
                return 'Inconnu'
        }
    }

    function showUsers(value) {
        return (
            <div>
                <Typography>Identité bénévole : {value.username}</Typography>
                <Typography>Etat : {getAction(value.state)}</Typography>
                <Divider/>
            </div>
        )
    }

    function showAdmins(value) {
        return (
            <div>
                <Typography>Identité administrateur : {value.username}</Typography>
                <Divider/>
            </div>
        )
    }

    function showFriends(value) {
        return (
            <div>
                <Typography>Identité ami : {value.username}</Typography>
                <Typography>Etat : {getAction(value.state)}</Typography>
                <Divider/>
            </div>
        )
    }

    return (
        <div>
            <Grid container>
                <Grid item xs>
                    <Typography variant='h6'>Actions sur les bénévoles</Typography>
                    {props.users.map(showUsers)}
                </Grid>
                <Grid item xs>
                <Typography variant='h6'>Attribution d'administrateurs</Typography>
                    {props.admins.map(showAdmins)}
                </Grid>
                <Grid item xs>
                    <Typography variant='h6'>Actions sur les amis assignés</Typography>
                    {props.friends.map(showFriends)}
                </Grid>
            </Grid>
        </div>
    )
}

export default AssignmentsRecap;