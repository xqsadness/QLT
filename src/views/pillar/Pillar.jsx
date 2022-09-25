import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, IconButton, InputBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const columns = [
    { id: 'Id', label: 'Id', minWidth: 170 },
    { id: 'City', label: 'City', minWidth: 100 },
    {
        id: 'Street',
        label: 'Street',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Action',
        label: 'Action',
        maxWidth: 70,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

// const rows = [
//     {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     },
//     {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     }, {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     }, {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     },
//     {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     },
//     {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     },
//     {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     },
//     {
//         name: 'Population',
//         code: 'IN',
//         population: 12321,
//         size: 123,
//         density: "density"

//     },

// ];
export default function Pillar({ data }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>

            <Container fluid style={{ height: "200px" }} className="header bg-gradient-info pb-8 pt-5 pt-md-8 ">
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>

                    <div style={{ width: '100%', display: "flex", flexDirection: "row" }}>
                        <Button sx={{ padding: "10px 5px", marginRight: '2%', height: '3.2em', width: "15%" }} variant="contained" color="success">
                            Add customer
                        </Button>
                        <Paper sx={{ boxShadow: "none", border: "1px solid #ddd", display: 'flex', padding: '7px 7px 3px 7px', width: '100%', marginBottom: '20px', borderRadius: '7px' }}>
                            <IconButton type="button" sx={{ p: '0px', }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1, width: '90%', fontSize: '1.1em' }}
                                placeholder="Search Name Customer"
                            />
                        </Paper>
                    </div>

                    {/* <TextField sx={{ mt: "7px", width: "400px" }} id="outlined-basic" label="Search" variant="outlined" /> */}
                    {/* stickyHeader */}
                    <TableContainer sx={{ minHeight: '29em' }}>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            sx={{ color: 'black', fontWeight: '600', fontSize: '1em' }}
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <TableRow hover role="checkbox">
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell > {item.city} </TableCell>
                                            <TableCell sx={{ textAlign: 'right' }}>  {item.street} </TableCell>
                                            <TableCell sx={{ textAlign: "right" }}>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className="btn-icon-only text-light"
                                                        href="#pablo"
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <i className="fas fa-ellipsis-v" />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        <DropdownItem
                                                            href="#pablo"
                                                            onClick={(e) => e.preventDefault()}>
                                                            <DeleteIcon></DeleteIcon>
                                                            Delete
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            href="#pablo"
                                                            onClick={(e) => e.preventDefault()}>
                                                            <EditIcon></EditIcon>
                                                            Update
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[6, 10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    )
}
