import React from "react";
import LoadingIndicator from "./LoadingIndicator";

function DataList(props) {

    const [loading,setLoading] = React.useState(false);
    const [details,setDetails] = React.useState();

    const axios = require('axios');

    async function fetchData() {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_API}${props.api}`)
        .then(res => {
            if (props.api.includes('availabilities') && props.hasOwnProperty('setDetails')) {
                props.setDetails(res.data.sessions_tasks_id)
            }
            if (res.data.nationality) {
                axios.get(`https://restcountries.eu/rest/v2/alpha/${res.data.nationality}?fields=translations`)
                .then(country => {
                    let data = res.data
                    data.nationality = country.data.translations.fr
                    setDetails(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else {
                setDetails(res.data);
                setLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        fetchData();
    }, [props.api])

    if (loading || !details || !props.keys) {
        return (
            <div>
                <LoadingIndicator/>
            </div>
        )
    }
    else {
        return (
            <div>
                {props.keys.map((arr) => {
                return (<div> {arr.name} :  {details[arr.key]} </div>)
                })}
            </div>
        )
    }
}
export default DataList;