import React from "react";

import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import CustomDivider from "../../utils/CustomDivider";

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
                <CustomDivider/>
            </div>
        )
    }

    function showAdmins(value) {
        return (
            <div>
                <Typography>Identité administrateur : {value.username}</Typography>
                <CustomDivider/>
            </div>
        )
    }

    function showFriends(value) {
        return (
            <div>
                <Typography>Identité ami : {value.username}</Typography>
                <Typography>Etat : {getAction(value.state)}</Typography>
                <CustomDivider/>
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