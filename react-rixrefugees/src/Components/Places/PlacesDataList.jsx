import React from "react";
import LoadingIndicator from "../utils/LoadingIndicator";

function DataList(props) {

    const [details,setDetails] = React.useState();
    const [loading,setLoading] = React.useState(false);

    const axios = require('axios');

    async function fetchPlaces() {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_API}/places/${props.id}`)
        .then(res => {
            setDetails(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        fetchPlaces();
    }, [props.id])

    if (loading || !details) {
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