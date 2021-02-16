import React from "react";
import {Grid,FormControl,MenuItem,Select,InputLabel} from "@material-ui/core";
import LoadingIndicator from "../../utils/LoadingIndicator";

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
                            onChange={props.handleChange}
                            name="places_id"
                        >
                            {places.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </React.Fragment>
        )
    }
}
export default PlacesAvail;