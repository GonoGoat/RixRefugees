import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useSnackbar } from 'notistack';

import axios from "../../utils/axios";
import otherAxios from "../../utils/otherAxios";

import Typography from "@material-ui/core/Typography";
import NewlineText from "../../utils/NewLineText";

function DataList(props) {

    const [loading,setLoading] = React.useState(false);
    const [details,setDetails] = React.useState();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    async function fetchData() {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_API}${props.api}`)
        .then(res => {
            if (props.api.includes('availabilities') && props.hasOwnProperty('setDetails')) {
                props.setDetails(res.data.sessions_tasks_id)
            }
            if (res.data.nationality) {
                otherAxios.get(`https://restcountries.eu/rest/v2/alpha/${res.data.nationality}?fields=translations`)
                .then(country => {
                    let data = res.data
                    data.nationality = country.data.translations.fr
                    setDetails(data);
                    setLoading(false);
                })
                .catch(err => {
                    closeSnackbar();
                    if (err.response) {
                        enqueueSnackbar(err.response.data, {variant : "error"});
                    }
                    else if (err.request) {
                        enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
                    } 
                    else {
                        enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
                    }
                    setLoading(false);
                });
            }
            else {
                setDetails(res.data);
                setLoading(false);
            }
        })
        .catch(err => {
            closeSnackbar();
            if (err.response) {
                enqueueSnackbar(err.response.data, {variant : "error"});
            }
            else if (err.request) {
                enqueueSnackbar("La requête n'a pas pû être lancée. Veuillez réessayer.", {variant : "error"});
            } 
            else {
                enqueueSnackbar("La requête n'a pas pû être créée. Veuillez réessayer.", {variant : "error"});
            }
            setLoading(false);
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
                    return (<Typography><strong>{arr.name} : </strong><NewlineText text={details[arr.key]}/> </Typography>)
                })}
            </div>
        )
    }
}
export default DataList;