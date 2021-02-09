import React from "react";

import { DataGrid } from '@material-ui/data-grid';

import '../../Style/ListingGrid.css';

function ListingGrid (props) {
    return (
        <div id='tab'>
            <DataGrid
            rows={props.rows}
            columns={props.columns}
            checkboxSelection
            autoHeight
            hideFooter
            disableColumnMenu
            onRowClick={(row) => {
                if (props.columns[(props.columns.length)-1].headerName.includes("lieu")) {
                    props.setId(row.row.id);
                }
            }}
            onSelectionChange={(select) => props.setSelected(select)}/>
        </div>
    );
}
export default ListingGrid;

/*onsole.log(row);
console.log(props.columns[props.columns.length()-1]);
if (props.columns[props.columns.length()-1].headerName.contains("Lieu")) {
    props.setId(row.data.id);
}*/