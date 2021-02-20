import React from "react";

import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from "@material-ui/core";

function DeleteButton (props) {
    return (
        <React.Fragment>
            <Button
                startIcon={<DeleteIcon/>}
                onClick={() => props.delete()}
                disabled={props.disabled}
            >
                Supprimer
            </Button>
        </React.Fragment>
    );
}
export default DeleteButton;