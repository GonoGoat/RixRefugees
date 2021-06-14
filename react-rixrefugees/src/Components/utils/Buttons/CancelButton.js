import React from "react";

import BlockIcon from '@material-ui/icons/Block';
import Button from "@material-ui/core/Button";

function CancelButton(props) {
    return (
        <Button
            startIcon={<BlockIcon/>}
            onClick={() => props.cancel()}
            disabled={props.disabled}
        >
            Annuler
        </Button>
    );
}

export default CancelButton;