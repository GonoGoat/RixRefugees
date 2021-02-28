import React from "react";

import AddIcon from '@material-ui/icons/Add';
import { Button } from "@material-ui/core";

function AddButton (props) {
    return (
        <React.Fragment>
            <Button
                color="green"
                startIcon={<AddIcon/>}
                onClick={() => props.add()}
                disabled={props.disabled}
            >
                Ajouter
            </Button>
        </React.Fragment>
    );
}
export default AddButton;