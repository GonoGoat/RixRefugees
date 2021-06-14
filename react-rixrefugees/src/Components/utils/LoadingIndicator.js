import React from "react";
import { CircularProgress } from '@material-ui/core';

function LoadingIndicator(props) {
    return (
        <React.Fragment>
            <CircularProgress/>
        </React.Fragment>
    )
}
export default LoadingIndicator;