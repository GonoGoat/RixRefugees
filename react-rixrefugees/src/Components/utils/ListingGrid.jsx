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
                    props.setForm();
                }
            }}
            onSelectionChange={(select) => props.setSelected(select)}/>
        </div>
    );
}
export default ListingGrid;