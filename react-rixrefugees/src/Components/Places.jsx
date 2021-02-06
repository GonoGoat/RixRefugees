import React from "react";
import ListingTab from './utils/ListingTab'

function Places () {
    const [data,setData] = React.useState();

    const axios = require('axios');

    async function fetchData(api) {
        axios.get(`${process.env.REACT_APP_API}${api}`)
        .then(res => {
            setData(res.data);
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        fetchData('/places')
    }, [])

    return (
        <div>
            Hello World !
        </div>
    )
}
export default Places;