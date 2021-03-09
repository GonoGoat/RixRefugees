import React from "react";
import LoadingIndicator from "../utils/LoadingIndicator";

import AddButton from "../utils/Buttons/AddButton";
import DeleteButton from "../utils/Buttons/DeleteButton";
import EditButton from "../utils/Buttons/EditButton";

import DataList from "../utils/DataList";
import ListingGrid from "../utils/ListingGrid";
import SessionsTasksForm from '../Forms/SessionsTasks/SessionsTasksForm';

import {sessionsDataListKeys} from '../../utils/DataListKeys/sessions';

function Managment(props) {

    const [data,setData] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [columns,setColumns] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [id,setId] = React.useState(0);
    const [isForm, setForm] = React.useState({
        form : '',
        edit : false
    });

    const axios = require('axios');

    React.useEffect(() => {
        setSelected([]);
        setId(0);
        setForm({
            form : '',
            edit : false
        })
        displayGrid();
    }, [props.api])

    async function displayGrid() {
        setLoading(true);
        setId(0);
        await axios.get(`${process.env.REACT_APP_API}/${props.api}`)
        .then(res => {
            setData(res.data);
            setColumns(props.options);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    async function deleteRows() {
        setLoading(true);
        await axios.delete(`${process.env.REACT_APP_API}/${props.api}/delete`, {data : selected})
        .then(res => {
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    function getDataList() {
        let keys;
        switch (props.api) {
            case 'sessions' :
                keys = sessionsDataListKeys;
                break;
        }
        let api = `/${props.api}/${id}`
        return <DataList keys={keys} api={api} />
    }

    if (loading === true) {
        return <LoadingIndicator/>
    }
    else if (data.length === 0) {
        return ''
    }
    else {
        return (
            <div>
                <ListingGrid filter={props.api === 'sessions'} setForm={() => setForm({form : false, edit : false})} rows={data} columns={columns} setId={(iden) => setId(iden)} setSelected={(ids) => setSelected(ids)}/>
                <div>
                    <AddButton disabled={false} add={()=>setForm({form : true,edit : false})}/>
                    <DeleteButton disabled={selected.length <= 0} delete={()=>deleteRows()}/>
                    <EditButton disabled={selected.length != 1} edit={() =>setForm({form : true,edit : true})}/>
                </div>
                {(isForm.form || id) ? (isForm.form ? <SessionsTasksForm edit={isForm.edit} stopForm={() => setForm({form : '',edit : false})} data={data}  header={columns} selected={selected} api={props.api}/> :
                    getDataList()) : ''
                }
            </div>
        )
    }
}

export default Managment;