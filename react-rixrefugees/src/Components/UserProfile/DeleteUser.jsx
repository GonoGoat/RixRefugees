import axios from "../../utils/axios";
import { useSnackbar } from 'notistack';

import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import CustomDeleteIcon from "../utils/Icons/CustomDeleteIcon";

function DeleteUser() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function deleteUser() {
        axios.delete(`${process.env.REACT_APP_API}/users/delete`)
        .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            window.location.href = "/";
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
        });
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>Vous êtes sur le point de supprimer votre compte du système.</Typography>
                    <Typography>A la suite de cette démarche, vos données personnelles seront supprimées de notre système, ne nous permettant plus de vous identifier.</Typography>
                    <Typography>Votre compte sera donc désactivé, et vous ne pourrez plus accéder à la plateforme. Cette opération est irréversible.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button startIcon={<CustomDeleteIcon/>} onClick={() => deleteUser()}>Supprimer mon compte</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DeleteUser;