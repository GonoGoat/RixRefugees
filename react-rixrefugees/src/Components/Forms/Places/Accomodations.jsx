import React from "react";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';

function Accomodations(props) {

    return (
        <React.Fragment>
            <Grid item>
                <FormControl>
                    <InputLabel>Lieu d'hébergement</InputLabel>
                    <Select
                        value={props.data[props.data.findIndex((obj) => obj.id === props.value.places_id)]}
                        onChange={props.handleInputChange}
                        name="places_id"
                    >
                        {props.data.map((obj) => {
                            return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choisissez les équipements voulus</FormLabel>
                    <FormGroup>
                        {props.header.map((obj,index) => 
                            <FormControlLabel
                                control={<Checkbox checked={props.value.equipments[index]} name={index.toString()} onChange={props.toggleAccomodation}/>}
                                label = {obj.name}
                                disabled={props.value.places_id === 0}
                            />
                        )}
                    </FormGroup>
                </FormControl>
            </Grid>
        </React.Fragment>
    )
    
}

export default Accomodations;