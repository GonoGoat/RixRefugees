import React from "react";
import { useSnackbar } from 'notistack';
import axios from "../utils/axios";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import FormLabel from "@material-ui/core/FormLabel";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import EditButton from "./utils/Buttons/EditButton";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";

import LoadingIndicator from "./utils/LoadingIndicator";
import CustomCheckIcon from "./utils/Icons/CustomCheckIcon";
import CustomCloseIcon from "./utils/Icons/CustomCloseIcon";

import classes from "../Style/ManageDonations";
const useStyles=classes;

function ManageDonations() {
    const [loading, setLoading] = React.useState(false);
    const [donations, setDonations] = React.useState();
    const [selected,setSelected] = React.useState(false);
    const [details, setDetails] = React.useState();
    const [filter,setFilter] = React.useState(true)

    const styles = useStyles();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/donations`)
        .then(res => {
            setDonations(res.data);
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

    async function handleDonationClick(id) {
        if (selected === false || selected != id) {
            await axios.get(`${process.env.REACT_APP_API}/donations/${id}`)
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
                <ListItem button onClick={() => handleDonationClick(value.id)} >
                    <ListItemIcon>
                        {value.isresolved ? <CustomCheckIcon/> : <CustomCloseIcon/>}
                    </ListItemIcon>
                    <ListItemText
                        primary={`Donation n°${value.id} : ${value.lname} ${value.fname}`}
                        secondary={`Initiée le ${value.date}`}
                    />
                    {selected && selected === value.id ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                </ListItem>
            </React.Fragment>
        )
    }

    function update() {
        axios.put(`${process.env.REACT_APP_API}/donations/update`,{id : details.id, isresolved : details.isresolved} )
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

    function filterDonations(don) {
        if (filter) return don.isresolved === false
        return don
    }

    function handleInputChange(e) {
        setDetails({
            ...details,
            isresolved : e.target.checked
        })
    }

    if (loading || !donations) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <div className={styles.root}>
                <List component="nav"classes={{root : styles.listRoot}}>
                    <ListItem>
                        <FormControlLabel
                            control={<Checkbox checked={!filter} onChange={() => setFilter(!filter)}/>}
                            label="Afficher toutes les donations"
                        />
                    </ListItem>
                    {donations.filter(filterDonations).map(getList)}
                </List>
                {selected ?
                    <div className={styles.formRoot}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant='h6'>Contact</Typography>
                                        <Typography>{details.contact}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant='h6'>Description</Typography>
                                        <Typography>{details.description}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLabel component="legend">La donation a-t-elle été reçue ou non ?</FormLabel>
                                        <FormControlLabel
                                            control={<Switch checked={details.isresolved} onChange={handleInputChange}/>}
                                            label={details.isresolved ? "Oui" : "Non"}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>                                
                                <EditButton disabled={false} edit={() => update()}/>
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

export default ManageDonations;