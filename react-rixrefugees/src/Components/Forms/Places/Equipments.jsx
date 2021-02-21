import React from "react";
import {Grid,TextField} from "@material-ui/core"

function Equipments (props) {
    
    return (
        <Grid item>
            <TextField
                id="equipments-form"
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