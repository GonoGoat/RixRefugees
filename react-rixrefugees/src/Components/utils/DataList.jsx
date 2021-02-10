import React from "react";
import LoadingIndicator from "./LoadingIndicator";

function DataList(props) {

    const [details,setDetails] = React.useState();

    const axios = require('axios');

    async function fetchPlaces() {
        props.setLoading(true);
        await axios.get(`${process.env.REACT_APP_API}/places/${props.id}`)
        .then(res => {
            setDetails(res.data);
            props.setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        fetchPlaces();
    }, [props.id])

    if (!details) {
        return (
            <div>
                <LoadingIndicator/>
            </div>
        )
    }
    else {
        return (
            <div>
                {Object.keys(details).map((arr) => {
                    return (<div> {arr} :  {details[arr]} </div>)
                })}
            </div>
        )
    }
}
export default DataList;