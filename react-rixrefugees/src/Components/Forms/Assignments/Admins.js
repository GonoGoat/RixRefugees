import React from "react";
import { useSnackbar } from 'notistack';

import LoadingIndicator from "../../utils/LoadingIndicator";
import TransferList from "../../utils/TransferList"

import axios from "../../../utils/axios";

const Admins = React.forwardRef((props, ref) => {
    
    const [loading,setLoading] = React.useState(false);
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [selected,setSelected] = React.useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useImperativeHandle(ref, () => ({
        setState() {
            props.setAdmins(right);
        }
    }));
     
    React.useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API}/users/admin/unavailable/${props.id}`)
        .then(res => {
            setLeft(res.data);
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
            <TransferList
                right={right} setRight={(r) => setRight(r)}
                left={left} setLeft={(l) => setLeft(l)}
                setSelected={(id) => setSelected(id != selected ? id : false)}
            />
        )
    }
});

export default Admins;