import React from "react";

import DataList from "../../utils/DataList";
import LoadingIndicator from "../../utils/LoadingIndicator";
import TransferList from "../../utils/TransferList"

import {availabilitiesDataListKeys} from "../../../utils/DataListKeys/availabilities";

const Assignments = React.forwardRef((props, ref) => {
    
    const [loading,setLoading] = React.useState(false);
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [selected,setSelected] = React.useState()

    const axios = require('axios')

    React.useImperativeHandle(ref, () => ({
        setState() {
            console.log(left);
            console.log(right);
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
            console.log(err);
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