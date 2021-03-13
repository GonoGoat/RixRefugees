import React from "react";

import { DataGrid } from '@material-ui/data-grid';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import classes from '../../Style/ListingGrid';
const useStyles = classes;

function ListingGrid (props) {
    const [filter,setFilter] = React.useState({state : false,selected : 0});
    const [placesFilter, setPlaces] = React.useState([]);
    const styles= useStyles();

    const axios = require('axios');

    function getFilter() {
        let filtered = props.rows;
        switch (props.api) {
            case '/sessions' :
                if (filter.selected != 0) {
                    filtered = filtered.filter(row => row.id === filter.selected)
                }
                if (filter.state) {
                    filtered = filtered.filter(row => new Date(row.end_date) >= new Date());
                }
                return filtered;
            case '/places_avail' :
                if (filter.state) {
                    filtered = filtered.filter(row => new Date(row.end_avail) >= new Date());
                }
                return filtered
            default :
                return filtered;
        }
    }

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/places`)
        .then(res => {
            let values = [{id : 0,name : '--Choisissez un endroit--'}];
            setPlaces(values.concat(res.data));
        })
        .catch(err => {
            console.log(err);
        });
    }, [])

    const handleChange = (event) => {
        setFilter({...filter, selected : event.target.value});
      };

    return (
        <div className={styles.tab}>
            <Grid container alignItems="center" justify="center" direction="row">
                {props.api === '/sessions' && placesFilter.length > 0 ? 
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={filter.state} onChange={() => setFilter({...filter,state : !filter.state})}/>}
                            label="N'afficher que les sessions en cours"
                        />
                        <InputLabel>Filtrer sur le lieu</InputLabel>
                        <Select
                            value={filter.selected.id}
                            onChange={handleChange}
                            name="places"
                        >
                            {placesFilter.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                    : <React.Fragment/>
                }
                {props.api === '/places_avail' ?
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={filter.state} onChange={() => setFilter({...filter,state : !(filter.state)})}/>}
                            label="N'afficher que les lieu d'hébergement actuellement disponibles"
                        />
                    </Grid>
                    : <React.Fragment/>
                }
            </Grid>
            <DataGrid
                rows={getFilter()}
                columns={props.columns}
                checkboxSelection
                autoHeight
                hideFooter
                disableColumnMenu
                onRowClick={(row) => {
                    if (props.columns[(props.columns.length)-1].headerName.includes("lieu")) {
                        props.setId(row.row.id);
                        props.setForm();
                    }
                }}
                onSelectionChange={(select) => props.setSelected(select.rowIds)}
            />
        </div>
    );
}
export default ListingGrid;