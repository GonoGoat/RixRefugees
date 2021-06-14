import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField"

function Status (props) {
    
    return (
        <Grid item>
            <TextField
                name="name"
                label="Nom du statut"
                type="text"
                value={props.value.name}
                onChange={props.handleInputChange}
                required
            />
        </Grid> 
    )
}
export default Status;