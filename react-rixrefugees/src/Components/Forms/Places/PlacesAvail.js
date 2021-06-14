import React from "react";
import { useSnackbar } from 'notistack';
import axios from "../../../utils/axios";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';

import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function PlacesAvail (props) {
    const [places,setPlaces] = React.useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/places`)
        .then(res => {
            setPlaces(res.data);
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

    if (!places) {
        return (
            <React.Fragment>
                <LoadingIndicator/>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <Grid item>
                    <FormControl>
                        <InputLabel>Lieux d'hébergement</InputLabel>
                        <Select
                            value={props.value.places_id}
                            onChange={props.handleInputChange}
                            name="places_id"
                        >
                            {places.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField
                        label="Date de début de disponibilité"
                        type='datetime-local'
                        name="start_avail"
                        value={props.value.start_avail}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Date de fin de disponibilité"
                        type='datetime-local'
                        name="end_avail"
                        value={props.value.end_avail}
                        onChange={props.handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Nombre de lit"
                        type='number'
                        name="bed_quantity"
                        value={props.value.bed_quantity}
                        onChange={props.handleInputChange}
                    />
                </Grid>
            </React.Fragment>
        )
    }
}
export default PlacesAvail;