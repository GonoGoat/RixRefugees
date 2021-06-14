import React from "react";

import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';

function EditButton(props) {
    return (
        <Button
            startIcon={<EditIcon/>}
            onClick={() => props.edit()}
            disabled={props.disabled}
        >
            Modifier
        </Button>
    );
}

export default EditButton;