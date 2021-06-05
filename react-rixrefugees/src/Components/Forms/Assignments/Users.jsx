import React from "react";
import { useSnackbar } from 'notistack';

import DataList from "../../utils/DataList";
import LoadingIndicator from "../../utils/LoadingIndicator";
import TransferList from "../../utils/TransferList"

import {availabilitiesDataListKeys} from "../../../utils/DataListKeys/availabilities";
import axios from "../../../utils/axios";

const Assignments = React.forwardRef((props, ref) => {
    
    const [loading,setLoading] = React.useState(false);
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [selected,setSelected] = React.useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useImperativeHandle(ref, () => ({
        setState() {
            let r = [...right]
            r.forEach(obj => {
                obj.isassigned === true ? obj.state = 'set' : obj.state = 'add'
            })
            let l = [...left]
            l.forEach(obj => {
                obj.isassigned === true ? obj.state = 'del' : obj.state = null
            })
            let values = r.concat(l.filter(obj => obj.state != null))
            props.setUsers(values);
        }
    }));
     
    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/availabilities/assigned/${props.id}`)
        .then(res => {
            setRight(res.data.filter((value) => value.isassigned === true));
            setLeft(res.data.filter((value) => value.isassigned === false));
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
    },[]);

    if (loading || !left || !right) {
        return <LoadingIndicator/>
    }
    else {
        return (
            <React.Fragment>
                <TransferList
                    right={right} setRight={(r) => setRight(r)}
                    left={left} setLeft={(l) => setLeft(l)}
                    setSelected={(id) => setSelected(id != selected ? id : false)}
                />
                {selected ? <DataList api={`/availabilities/${selected}`} keys={availabilitiesDataListKeys}/> : <React.Fragment/>}
            </React.Fragment>
        )
    }
});

export default Assignments;