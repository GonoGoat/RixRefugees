import React from "react";
import {Grid,TextField} from "@material-ui/core"

function Tasks (props) {
    
    return (
        <Grid item>
            <TextField
                name="name"
                label="Nom de la tâche"
                type="text"
                value={props.value.name}
                onChange={props.handleInputChange}
                required
            />
        </Grid> 
    )
}
export default Tasks;