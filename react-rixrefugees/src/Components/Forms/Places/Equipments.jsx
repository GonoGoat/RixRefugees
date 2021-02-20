import React from "react";
import {Grid,TextField} from "@material-ui/core"

function Equipments (props) {

    console.log(props);
    return (
        <Grid item>
            <TextField
                id="equipments-form"
                name="name"
                label="Nom de l'équipement"
                type="text"
                defaultValue={props.init.name}
                value={props.value.name}
                onChange={props.handleInputChange}
                required
            />
        </Grid> 
    )
}
export default Equipments;