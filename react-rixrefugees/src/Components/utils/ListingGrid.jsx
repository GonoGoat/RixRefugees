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
            disableColumnMenu />
        </div>
    );
}
export default ListingGrid;