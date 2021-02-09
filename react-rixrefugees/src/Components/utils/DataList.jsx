import React from "react";

function DataList(props) {
    return (
        <div>
            Hello {props.id ? props.id : "World !"}
        </div>
    )
}
export default DataList;