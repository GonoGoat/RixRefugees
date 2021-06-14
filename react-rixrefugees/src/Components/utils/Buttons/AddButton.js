import React from "react";

import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";

function AddButton (props) {
    return (
        <Button
            color="green"
            startIcon={<AddIcon/>}
            onClick={() => props.add()}
            disabled={props.disabled}
        >
            Ajouter
        </Button>
    );
}
export default AddButton;