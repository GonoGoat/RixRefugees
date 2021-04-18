import React from "react";

import LoadingIndicator from "../../utils/LoadingIndicator";
import TransferList from "../../utils/TransferList"

const Admins = React.forwardRef((props, ref) => {
    
    const [loading,setLoading] = React.useState(false);
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [selected,setSelected] = React.useState()

    const axios = require('axios')

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
            console.log(err);
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