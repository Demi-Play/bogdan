import { Button, Card, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Card sx={{ minWidth: 400, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', placeItems: 'center' }} >
            <Typography variant='h5' >Добавление категории продуктов</Typography>
            <TextField
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                type="text"
                placeholder="Category Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleSubmit}>Add Category</Button>
        </Card>
    );
};

export default CategoryForm;
