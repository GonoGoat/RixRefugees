import React from "react";

function GetUserActivity() {
    const [user,setUser] = React.useState();
    const [availabilities,setAvailabilities] = React.useState(getAvailabilities());

    async function getAvailabilities() {
        return 1
    }

    return (
        "Hello world !"
    )
}

export default GetUserActivity;