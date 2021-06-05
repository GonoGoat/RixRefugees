import React from "react";
import { useSnackbar } from 'notistack';
import axios from "../../../utils/axios";

import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function SessionsTasks (props) {
    const [country,setCountry] = React.useState();
    const [status,setStatus] = React.useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(async () => {
        await axios.get(`https://restcountries.eu/rest/v2/all?fields=alpha3Code;translations`)
        .then(res => {
            setCountry(res.data.filter(obj => obj.translations.hasOwnProperty('fr')).sort((a, b) => {
                let fa = a.translations.fr.toLowerCase(),
                    fb = b.translations.fr.toLowerCase();
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            }));
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

        await axios.get(`${process.env.REACT_APP_API}/status`)
        .then(res => {
            setStatus(res.data);
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
    }, [])

    if (!status || !country) {
        return (
            <LoadingIndicator/>
        )
    }
    else {
        return (
            <React.Fragment>
                <Grid item>
                    <TextField
                        name="lname"
                        label="Nom de l'ami"
                        type="text"
                        value={props.value.lname}
                        onChange={props.handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="fname"
                        label="Prénom de l'ami"
                        type="text"
                        value={props.value.fname}
                        onChange={props.handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Date de naissance"
                        type='date'
                        name="birth_date"
                        value={props.value.birth_date}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="phone"
                        label="Numéro de téléphone"
                        type="text"
                        value={props.value.phone}
                        onChange={props.handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Date d'arrivée"
                        type='date'
                        name="in_date"
                        value={props.value.in_date}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel>Status de l'ami</InputLabel>
                        <Select
                            value={props.value.status_id}
                            onChange={props.handleInputChange}
                            name="status_id"
                        >
                            {status.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel>Nationalité de l'ami</InputLabel>
                        <Select
                            value={props.value.nationality}
                            onChange={props.handleInputChange}
                            name="nationality"
                        >
                            {country.map((obj) => {
                                return <MenuItem value={obj.alpha3Code}>{obj.translations.fr}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                {props.edit ?
                   <Grid item>
                    <TextField
                        label="Date de départ"
                        type='date'
                        name="out_date"
                        value={props.value.out_date}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </Grid> 
                :
                    <React.Fragment/>
                }
                <Grid item>
                    <TextField
                        name="notes"
                        label="Notes"
                        type="text"
                        value={props.value.notes}
                        onChange={props.handleInputChange}
                        multiline
                        rows={5}
                    />
                </Grid>
            </React.Fragment>
        )
    }
}

export default SessionsTasks;