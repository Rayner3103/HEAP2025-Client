import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const AddPage = () => {
    const [recordNumber, setRecordNumber] = useState<number>(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (Number(recordNumber) < 0) {
            setError("Record Number cannot be negative");
            return;
        }
        setError("");
        
        fetch('http://localhost:5000/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recordNumber })
        })
        .then(response => {
            if (response.status === 200 && response.ok === true) {
                navigate('/');
            }
        })
        .catch(error => {
            // handle error
            console.warn(error);
        });
    }

    return (
        <>
            <Typography variant='h2'>Add your data here!</Typography>

            <Box slot='form' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center' }}>Record Number:</Typography>
                <TextField 
                    id='recordNumber' 
                    variant='outlined' 
                    label='Record Number' 
                    type='number' 
                    value={recordNumber}
                    onChange={e => setRecordNumber(Number(e.target.value))}
                    error={!!error}
                    helperText={error}
                />
                <Button variant='outlined' onClick={handleSubmit}>Add data</Button>
            </Box>
        </>
    )
}

export default AddPage;