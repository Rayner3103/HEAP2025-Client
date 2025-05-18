import { 
    Box,
    Button,
    Paper,
    Typography
} from '@mui/material';
import { 
    DataGrid,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface dataSchema {
    id: number,
    name: number,
    created_at: number
}

const Home = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<dataSchema[]>([]);

    const handleDelete = (id: number) => {
        fetch('http://localhost:5000/delete/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
        })
        .then(response => {
            if (response.status === 200 && response.ok === true) {
                fetchData();
            }
        })
        .catch(error => {
            // handle error
            console.warn(error);
        });
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'created_at', headerName: 'Created Date', flex: 4 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,
            sortable: false,
            filterable: false,
            renderCell: (params: any) => (
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(params.row.id)}
                >
                    Delete
                </Button>
            )
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    useEffect(() => {
        fetchData();
    }, [])

    const handleTestClick = () => {
    console.log('Button clicked!');
    fetch('http://localhost:5000/test/')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            navigate('/other', { state: { data } });
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    const fetchData = () => {
        fetch('http://localhost:5000/read/')
            .then(response => {
                if (response.status === 200 && response.ok === true) {
                    return response.text();
                }
                console.log('Data Retrieval Failed');
            }).then((data) => {
                const tempRows = JSON.parse(data?? '');
                
                setRows(tempRows);
            })
    }

    return (
        <Box sx={{ display: 'flex', alignItems:'center', flexDirection: 'column' }}>
            <Paper sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant='h2'>Welcome to the Home Page</Typography>
                <Typography variant='h5'>This is a simple home page component.</Typography>
                <Button variant='outlined' onClick={handleTestClick}>Test</Button>
                <Button variant='outlined' onClick={fetchData}>Read Data</Button>
                <Button 
                    variant='outlined' 
                    onClick={() => {
                        navigate('/add')
                    }}
                >
                    Add Data
                </Button>
            </Paper>

            <Paper sx={{ height: 400, width: '80%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    )
}

export default Home;