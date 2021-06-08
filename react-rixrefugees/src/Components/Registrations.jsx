import React from "react";
import { useSnackbar } from 'notistack';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CustomCheckIcon from "./utils/Icons/CustomCheckIcon";
import CustomCloseIcon from "./utils/Icons/CustomCloseIcon";
import classes from "../Style/Registrations";
import axios from "../utils/axios";
import LoadingIndicator from "./utils/LoadingIndicator";
import NewLineText from "../utils/NewLineText";

const useStyles=classes;


function Registrations() {
    const [loading, setLoading] = React.useState(false);
    const [registrations, setRegistrations] = React.useState();
    const [selected,setSelected] = React.useState(false);
    const [details, setDetails] = React.useState();

    const styles = useStyles();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/registrations`)
        .then(res => {
            setRegistrations(res.data);
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

    async function handleRegistrationClick(id) {
        if (selected === false || selected != id) {
            await axios.get(`${process.env.REACT_APP_API}/registrations/${id}`)
            .then(res => {
                setDetails(res.data);
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
            setSelected(id)
        }
        else {
            setSelected(false)
        }
    }

    function getList(value) {
        return (
            <React.Fragment>
                <ListItem button onClick={() => handleRegistrationClick(value.id)} >
                    <ListItemText
                        primary={`Candidature n°${value.id} : ${value.lname} ${value.fname}`}
                        secondary={`Publiée le ${value.lastactivity} avec l'adresse email ${value.mail}`}
                    />
                    {selected && selected === value.id ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                </ListItem>
            </React.Fragment>
        )
    }

    function accept() {
        axios.post(`${process.env.REACT_APP_API}/registrations/add`, {id : selected})
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
        });
    }

    function refuse() {
        axios.delete(`${process.env.REACT_APP_API}/registrations/delete`, {data : {id : selected}})
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
        });
    }

    if (loading || !registrations) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <div className={styles.root}>
                <List component="nav"classes={{root : styles.listRoot}}>
                    {registrations.map(getList)}
                </List>
                {selected ?
                    <div className={styles.formRoot}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant='h6'>Contact</Typography>
                                        <Typography><NewLineText text={details.contact}/></Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='h6'>Motivations</Typography>
                                        <Typography><NewLineText text={details.motivation}/></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Button onClick={() => accept()} startIcon={<CustomCheckIcon/>}>Accepter</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={() => refuse()} startIcon={<CustomCloseIcon/>}>Refuser</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>                  
                :
                    <React.Fragment/>
                }
            </div>
        )
    }
}

export default Registrations;