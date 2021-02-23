import React from "react";
import LoadingIndicator from "./LoadingIndicator";

function DataList(props) {

    const [loading,setLoading] = React.useState(false);

    const axios = require('axios');

    if (loading || !props.data) {
        return (
            <div>
                <LoadingIndicator/>
            </div>
        )
    }
    else {
        return (
            <div>
                {Object.keys(props.data).map((arr) => {
                    return (<div> {arr} :  {props.data[arr]} </div>)
                })}
            </div>
        )
    }
}
export default DataList;