import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField"

function Places (props) {
    return (
        <React.Fragment>
            <Grid item>
                <TextField
                    id="places-name"
                    name="name"
                    label="Nom de l'endroit"
                    type="text"
                    value={props.value.name}
                    onChange={props.handleInputChange}
                    required
                />
            </Grid>
            <Grid item>
                <TextField
                    id="places-address"
                    name="address"
                    label="Adresse de l'endroit"
                    type="text"
                    value={props.value.address}
                    onChange={props.handleInputChange}
                    required
                />
            </Grid>
            <Grid item>
                <TextField
                    id="places-desc"
                    name="description"
                    label="Description de l'endroit"
                    type="text"
                    value={props.value.description}
                    onChange={props.handleInputChange}
                    multiline
                    rowsMax = {10}
                />
            </Grid>
        </React.Fragment>
    )
}
export default Places;