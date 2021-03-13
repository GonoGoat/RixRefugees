import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField"

function Equipments (props) {
    
    return (
        <Grid item>
            <TextField
                name="name"
                label="Nom de l'équipement"
                type="text"
                value={props.value.name}
                onChange={props.handleInputChange}
                required
            />
        </Grid> 
    )
}
export default Equipments;