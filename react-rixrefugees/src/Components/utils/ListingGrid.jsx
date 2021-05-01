import React from "react";

import { DataGrid,useGridSlotComponentProps } from '@material-ui/data-grid';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';

import classes from '../../Style/ListingGrid';
const useStyles = classes;
  
  function CustomPagination() {
    const { state, apiRef } = useGridSlotComponentProps();
    const classes = useStyles();
  
    return (
      <Pagination
        className={classes.root}
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

const sessTasksFilter = ["Tout","A venir", "En cours", "Terminé"]
  


function ListingGrid (props) {
    const [filter,setFilter] = React.useState({state : false,selected : 0});
    const [placesFilter, setPlaces] = React.useState([]);
    const styles= useStyles();

    const axios = require('axios');

    function getFilter() {
        let filtered = props.rows;
        switch (props.api) {
            case '/sessions' :
                if (filter.selected !== 0) {
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
            case '/sessions_tasks' :
                switch (filter.selected) {
                    case 1 :
                        filtered = filtered.filter(row => new Date() < new Date(row.start_date));
                        break;
                    case 2 :
                        filtered = filtered.filter(row => (new Date()) > (new Date(row.start_date)) && (new Date()) < (new Date(row.end_date)));
                        break;
                    case 3 :
                        filtered = filtered.filter(row => new Date() > new Date(row.end_date));
                        break;
                    default :
                        break;
                }
                return filtered;
            case '/friends' : 
                if (!filter.state) {
                    filtered = filtered.filter(row => row.out_date === null);
                }
            return filtered
            default :
                return filtered;
        }
    }

    React.useEffect(() => {
        if (props.api === '/sessions') {
            axios.get(`${process.env.REACT_APP_API}/places`)
            .then(res => {
                let values = [{id : 0,name : '--Choisissez un endroit--'}];
                setPlaces(values.concat(res.data));
            })
            .catch(err => {
                console.log(err);
            });
        }
    },[])

    const handleChange = (event) => {
        setFilter({...filter, selected : event.target.value});
      };

    return (
        <div className={styles.tab}>
            <Grid container alignItems="center" justify="center" direction="row">
                {props.api === '/sessions' && placesFilter.length > 0 ?
                    <React.Fragment>
                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox checked={filter.state} onChange={() => setFilter({...filter,state : !filter.state})}/>}
                                label="N'afficher que les sessions en cours"
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel>Filtrer sur le lieu</InputLabel>
                            <Select
                                value={filter.selected}
                                onChange={handleChange}
                                name="places"
                            >
                            {placesFilter.map((obj) => {
                                return <MenuItem value={obj.id}>{obj.name}</MenuItem>
                            })}
                            </Select>
                        </Grid>
                    </React.Fragment>
                    : <React.Fragment/>
                }
                {props.api === '/places_avail' ?
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={filter.state} onChange={() => setFilter({...filter,state : !(filter.state)})}/>}
                            label="N'afficher que les lieux d'hébergement actuellement disponibles"
                        />
                    </Grid>
                    : <React.Fragment/>
                }
                {props.api === '/sessions_tasks' ?
                    <Grid item>
                            <InputLabel>Filtrer sur l'état de la tâche</InputLabel>
                            <Select
                                value={filter.selected}
                                onChange={handleChange}
                                name="places"
                            >
                            {sessTasksFilter.map((obj,index) => {
                                return <MenuItem value={index}>{obj}</MenuItem>
                            })}
                            </Select>
                    </Grid>
                    : <React.Fragment/>
                }
                {props.api === '/friends' ?
                    <Grid item>
                        <FormControlLabel
                            control={<Checkbox checked={filter.state} onChange={() => setFilter({...filter,state : !(filter.state)})}/>}
                            label="Afficher les amis partis"
                        />
                    </Grid>
                    : <React.Fragment/>
                }
            </Grid>
            <DataGrid
                pagination
                pageSize={7}
                components={{
                    Pagination: CustomPagination,
                }}
                rows={getFilter()}
                columns={props.columns}
                checkboxSelection
                autoHeight
                hideFooterSelectedRowCount
                disableColumnMenu
                onRowClick={(row) => {
                    if (props.columns[(props.columns.length)-1].headerName.includes("lieu") || props.columns[(props.columns.length)-1].headerName.includes("arrivée")) {
                        props.setId(row.row.id);
                        props.setForm();
                    }
                }}
                onSelectionModelChange={(newSelection) => {
                    props.setSelected(newSelection.selectionModel);
                }}
            />
        </div>
    );
}
export default ListingGrid;