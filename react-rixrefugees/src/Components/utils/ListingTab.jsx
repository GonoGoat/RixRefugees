import React from "react";

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import {Paper} from '@material-ui/core';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow }from '@material-ui/core'

function ListingTab(props) {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {props.header.map((obj) => <TableCell id={obj.id} align="left"><strong>{obj.name}</strong></TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        {row.check.map((obj) => <TableCell> {obj === true ? <CheckIcon/> : <CloseIcon/>}</TableCell>)}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default ListingTab;