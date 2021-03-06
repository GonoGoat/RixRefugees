import React from "react";
import { useSnackbar } from 'notistack';
import axios from "../../utils/axios";

import ListingGrid from "../utils/ListingGrid";
import ListingTab from "../utils/ListingTab";
import LoadingIndicator from "../utils/LoadingIndicator";
import DataList from "../utils/DataList";
import PlacesForm from '../Forms/Places/PlacesForm';

import AddButton from "../utils/Buttons/AddButton";
import DeleteButton from "../utils/Buttons/DeleteButton";
import EditButton from "../utils/Buttons/EditButton";

import {placesDataListKeys} from "../../utils/DataListKeys/places";
import {sessionsDataListKeys} from '../../utils/DataListKeys/sessions';

function PlacesData(props) {
    const [data,setData] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [columns,setColumns] = React.useState([]);
    const [isTab,setTab] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [id,setId] = React.useState(0);
    const [isForm, setForm] = React.useState({
        form : '',
        edit : false
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {
        setTab(false);
        setSelected([]);
        setId(0);
        setForm({
            form : '',
            edit : false
        })
        if (props.options === 0) {
            displayAccomodations();
        }
        else {
            displayGrid(props.api,props.options);
        }
    }, [props.api,props.options])

    // Display ListingGrid
    async function displayGrid(api,options) {
        setLoading(true);
        setId(0);
        await axios.get(`${process.env.REACT_APP_API}${api}`)
        .then(res => {
            setData(res.data);
            setColumns(options);
            setTab(false); // Display Grid, not Tab
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

    async function displayAccomodations() {
        setLoading(true);
        setId(0);
        let header = [{id : 0,name : "Nom du lieu"}]; // First column = name of places
        let rows = [];
        let acc;

        await axios.get(`${process.env.REACT_APP_API}/equipments`)
        .then(res => {
            header = header.concat(res.data);// Add a column per equipment
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
        });

        await axios.get(`${process.env.REACT_APP_API}/places`)
        .then(res => {
            res.data.map((obj,index)=> {
                rows.push({name : obj.name, id : obj.id,check : []}) // First column = name of places
                for (let i = 0;i<header.length-1;i++) { // By default : No equipments
                    rows[index].check.push(false);
                }
            });
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
        });

        await axios.get(`${process.env.REACT_APP_API}/accomodations`)
        .then(res => {
            acc = res.data;
        })
        .catch(err => {
            console.log(err);
        });

        let compare,k,tab;
        for (let j = 0;j<rows.length;j++) { // Check equipments for each place
            compare = acc.filter((obj) => obj.places_id === rows[j].id); // Get all accomodations values for a certain places_id
            if (compare.length === 0) {continue;} // Cancel if no equipments
            compare.map((obj) => {
                // Write that the place contain equipments
                k = header.findIndex((elem) => elem.id === obj.equipments_id); 
                if (k !== -1) {
                    tab = rows.find((elem) => elem.id === obj.places_id);
                    tab.check[k-1] = true;
                }
            })
        }
        setTab(true); // Display the tab
        setColumns(header); // Give the Header 
        setData(rows); // Give the rows
        setLoading(false); // Stop loading
    }
  
    async function deleteRows() {
        setLoading(true);
        await axios.delete(`${process.env.REACT_APP_API}${props.api}/delete`, {data : selected})
        .then(res => {
            localStorage.setItem("rixrefugees-message",res.data);
            localStorage.setItem("rixrefugees-url",props.api);
            window.location.reload();
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

    function getDataList() {
        let keys;
        switch (props.api) {
            case '/places' :
                keys = placesDataListKeys;
                break;
            case '/sessions' :
                keys = sessionsDataListKeys;
                break;
            default :
                break;
        }
        let api = `${props.api}/${id}`
        return <DataList keys={keys} api={api} />
    }

    function checkSubmit() {
        if (window.confirm(`Vous êtes sur le point de supprimer des données. Cette action est irréversible ! Êtes-vous certains de vouloir faire cette action ?`)) deleteRows();
    }

    return (
        <div>
            {data.length === 0 ? <React.Fragment/> : 
                (loading === true ? <LoadingIndicator/> : 
                    (isTab === true ? <ListingTab rows={data} header={columns}/> : 
                        <ListingGrid api={props.api} setForm={() => setForm({form : false, edit : false})} rows={data} columns={columns} setId={(iden) => setId(iden)} setSelected={(ids) => setSelected(ids)}/>)
                )
            }
            <div>
                <AddButton disabled={props.api === "/accomodations"} add={()=>setForm({form : true,edit : false})}/>
                <DeleteButton disabled={props.api === "/accomodations" || selected.length === 0} delete={()=>checkSubmit()}/>
                <EditButton disabled={selected.length !== 1 && props.api !== "/accomodations"} edit={() =>setForm({form : true,edit : true})}/>
            </div>
            {(isForm.form || id) ? (isForm.form ? <PlacesForm edit={isForm.edit} stopForm={() => setForm({form : '',edit : false})} data={data}  header={columns} selected={selected} form={props.api}/> :
             getDataList()) : <React.Fragment/>
            }
        </div>
    )
}
export default PlacesData;