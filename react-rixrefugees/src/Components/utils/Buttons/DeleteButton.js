import React from "react";

import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";

function DeleteButton (props) {
    return (
        <Button
            startIcon={<DeleteIcon/>}
            onClick={() => props.delete()}
            disabled={props.disabled}
        >
            Supprimer
        </Button>
    );
}
export default DeleteButton;