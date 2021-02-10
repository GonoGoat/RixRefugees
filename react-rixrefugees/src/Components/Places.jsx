import React from "react";

import ListingGrid from './utils/ListingGrid';
import LoadingIndicator from "./utils/LoadingIndicator";
import ListingTab from "./utils/ListingTab";
import DataList from "./utils/DataList";

import {Button} from '@material-ui/core';
//ListingGrid imports
import {placesList} from "../utils/DataGridColumns/places"
import {equipList} from "../utils/DataGridColumns/equipments";
import {pavailList} from "../utils/DataGridColumns/places_avail";

function Places () {
    const [data,setData] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [columns,setColumns] = React.useState([]);
    const [isTab,setTab] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [id,setId] = React.useState(0);

    const axios = require('axios');

    // Display ListingGrid
    async function displayGrid(api,options) {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_API}${api}`)
        .then(res => {
            setData(res.data);
            setColumns(options);
            setTab(false); // Display Grid, not Tab
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        });
    }

    async function displayAccomodations() {
        setLoading(true);
        let header = [{id : 0,name : "Nom du lieu"}]; // First column = name of places
        let rows = [];
        let acc;

        await axios.get(`${process.env.REACT_APP_API}/equipments`)
        .then(res => {
            header = header.concat(res.data);// Add a column per equipment
        })
        .catch(err => {
            console.log(err);
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
            console.log(err);
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
                if (k != -1) {
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

    return (
        <div>
            <div>
                <Button onClick={() => displayGrid('/places',placesList)}>Lieux d'hébergement</Button>
                <Button onClick={() => displayGrid('/equipments',equipList)}>Equipements existants</Button>
                <Button onClick={() => displayAccomodations()}>Equipements des lieux d'hébergement</Button>
                <Button onClick={() => displayGrid('/places_avail',pavailList)}>Lieux d'hébergement disponibles</Button>
            </div>
            {data.length === 0 ? '' : 
                (loading === true ? <LoadingIndicator/> : 
                    (isTab === true ? <ListingTab rows={data} header={columns}/> : 
                        <ListingGrid rows={data} columns={columns} setId={(iden) => setId(iden)} setSelected={(ids) => setSelected(ids)}/>)
                )
            }
            <div>
                {id === 0 ? '' :<DataList setLoading={(load) => setLoading(load)} id={id}/>}
            </div>
        </div>
    )
}
export default Places;