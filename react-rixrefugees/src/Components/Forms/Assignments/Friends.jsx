import React from "react";
import { useSnackbar } from 'notistack';

import DataList from "../../utils/DataList";
import LoadingIndicator from "../../utils/LoadingIndicator";
import TransferList from "../../utils/TransferList"

import Button from "@material-ui/core/Button";

import {friendsDataListKeys} from "../../../utils/DataListKeys/friends";
import axios from "../../../utils/axios";

const Friends = React.forwardRef((props, ref) => {
    
    const [loading,setLoading] = React.useState(false);
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [selected,setSelected] = React.useState()
    const [noFriend, setNoFriend] = React.useState(false)
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
            let values = r.concat(l.filter(obj => obj.state != null));
            props.setFriends(values);
        }
    }));
     
    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/friends/assigned/${props.id}`)
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
                <Button onClick={() => }>N'assigner aucun ami</Button>
                {selected ? <DataList api={`/friends/display/${selected}`} keys={friendsDataListKeys}/> : <React.Fragment/>}
            </React.Fragment>
        )
    }
});

export default Friends;