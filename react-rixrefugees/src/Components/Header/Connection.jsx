import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button";

import { useSnackbar } from 'notistack';
import axios from "../../utils/axios";
import classes from '../../Style/Header';
const useStyles = classes;

function Connection() {
    const history = useHistory();
    const styles = useStyles();
    const userId = useSelector(state => state.user);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function logout() {
        axios.post(`${process.env.REACT_APP_API}/users/logout`)
        .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            window.location.href = process.env.REACT_APP;
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
        <div className={`${styles.connection} ${styles.links}`}>
            {userId > 0 ?
                <Button size="small" onClick={() => logout()}>Se déconnecter</Button>
                :
                <React.Fragment>
                    <Button size="small" onClick={() => history.push('/login')}>Se connecter</Button>
                    <Button size="small" onClick={() => history.push("/register")}>S'inscrire</Button>
                </React.Fragment>
            }
        </div>
    )
}

export default Connection;