import React from "react";

import LoadingIndicator from "../../utils/LoadingIndicator";

import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function UserActivityForm(props) {
    return (
        <div>
            <form>
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            name="description"
                            label="Donnez nous ici les détails de votre disponiblité"
                            type="text"
                            value={props.value.description}
                            onChange={props.handleInputChange}
                            multiline
                            rows={5}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default UserActivityForm;