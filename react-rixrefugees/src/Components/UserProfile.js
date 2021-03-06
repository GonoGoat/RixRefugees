import React from "react";
import axios from "../utils/axios";
import { useSnackbar } from 'notistack';
import LoadingIndicator from "./utils/LoadingIndicator";
import {useHistory} from "react-router-dom";

import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box"

import CloseIcon from '@material-ui/icons/Close';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EditIcon from '@material-ui/icons/Edit';

import NewLineText from "../utils/NewLineText";

function UserProfile() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loading,setLoading] = React.useState(true);
    const [user,setUser] = React.useState();
    const history = useHistory();

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/users/me`)
        .then(res => {
            setUser(res.data);
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

    if (loading) return <LoadingIndicator/>
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h3'>Informations de votre compte</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <Box border={1} borderRadius={8} borderColor='primary.main'>
                                        <Typography variant='h6'>Identifiant</Typography>
                                        <Typography>{user.id}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box border={1} borderRadius={8} borderColor='primary.main'>
                                        <Typography variant='h6'>Nom</Typography>
                                        <Typography>{user.lname}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box border={1} borderRadius={8} borderColor='primary.main'>
                                        <Typography variant='h6'>Prénom</Typography>
                                        <Typography>{user.fname}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box border={1} borderRadius={8} borderColor='primary.main'>
                                        <Typography variant='h6'>Adresse email</Typography>
                                        <Typography>{user.mail}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box border={1} borderRadius={8} borderColor='primary.main'>
                                        <Typography variant='h6'>Statut</Typography>
                                        <Typography>{user.isadmin}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box border={1} borderRadius={8} borderColor='primary.main'>
                                        <Typography variant='h6'>Moyen de contact</Typography>
                                        <Typography><NewLineText text={user.contact}/></Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}> 
                    <Grid item container>
                        <Grid item xs={12}>
                            <Typography variant='h3'>Actions sur votre compte</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Button startIcon={<CloseIcon/>} onClick={() => history.push("/user/profile/delete")}>Supprimer votre compte</Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button startIcon={<EditIcon/>} onClick={() => history.push("/user/profile/edit")}>Modifier vos données personnelles</Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button startIcon={<VpnKeyIcon/>} onClick={() => history.push("/user/profile/password")}>Changer votre mot de passe</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserProfile;