import React from "react";
import {Grid,FormControl,MenuItem,Select,InputLabel} from "@material-ui/core"

function Accomodations(props) {

    React.useEffect(() => {
        console.log(props.data);
    }, [])

    return ('Hello world')
    
}

export default Accomodations;