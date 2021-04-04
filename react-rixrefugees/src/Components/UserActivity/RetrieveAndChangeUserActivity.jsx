import React from "react";
import { useParams } from 'react-router-dom';

function RetrieveAndChangeUserActivity() {
    return (
        `Hello ${useParams().id} !`
    )
}

export default RetrieveAndChangeUserActivity;