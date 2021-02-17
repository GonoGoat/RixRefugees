import React from "react";
import {Grid,FormControl,MenuItem,Select,InputLabel, TextField} from "@material-ui/core";
import LoadingIndicator from "../../utils/LoadingIndicator";
import "date-fns";

function PlacesAvail (props) {
    const [places,setPlaces] = React.useState();

    const axios = require('axios');

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/places`)
        .then(res => {
            setPlaces(res.data);
        })
        .catch(err => {
            console.log(err);
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
                            value={places[places.findIndex((obj) => obj.id === props.value.places_id)]}
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
                        defaultValue={props.value.start_avail}
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
                        defaultValue={props.value.end_avail}
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
                        defaultValue={props.value.bed_quantity}
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