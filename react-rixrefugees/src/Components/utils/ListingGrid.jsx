import React from "react";

import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import '../../Style/ListingGrid.css';

function ListingGrid (props) {
    const [filter,setFilter] = React.useState(false);

    return (
        <div id='tab'>
            {props.filter ? 
                <FormControlLabel
                    control={<Checkbox checked={filter} onChange={() => setFilter(!filter)}/>}
                    label="N'afficher que les sessions en cours"
                />
                : ''
            }
            <DataGrid
            rows={filter ? props.rows.filter(row => new Date(row.end_date) >= new Date()) : props.rows}
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
            onSelectionChange={(select) => props.setSelected(select.rowIds)}/>
        </div>
    );
}
export default ListingGrid;