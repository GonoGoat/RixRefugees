import React from "react";

import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

function EditButton(props) {
    return (
        <React.Fragment>
            <Button
                startIcon={<EditIcon/>}
                onClick={() => props.edit()}
                disabled={props.disabled}
            >
                Modifier
            </Button>
        </React.Fragment>
    );
}

export default EditButton;