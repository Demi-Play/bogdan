import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, TextField, Typography } from '@mui/material';

const ProductForm = () => {
    const [productData, setProductData] = useState({
        buyerId: '',
        categoryId: '',
        name: '',
        description: '',
        cost: '',
        image: ''
    });
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getUsers();
        getCategories();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/categories');
            setCategories(response.data);
            console.log(categories)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/product', productData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    return (
        <Card sx={{ minWidth: 400, minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', placeItems: 'center' }}>
            <Typography variant='h5' >Добавление продукта</Typography>
            <select style={{ width: 210, height: 56, backgroundColor: '#fff', color: '#000' }} disabled name="buyerId" onChange={handleChange}>
                <option style={{ width: 210, height: 56 }} value="">Выберите id покупателя</option>
                {users.map((user) => (

                    user && user.email === 'admin' ? null :
                        <option style={{ width: 210, height: 56, color: '#000' }} key={user.id} value={user.id}>{user.name} {user.surname}</option>

                ))}
            </select>
            <select style={{ width: 210, height: 56, backgroundColor: '#fff', color: '#000' }} name="categoryId" onChange={handleChange}>
                <option style={{ width: 210, height: 56 }} value="">Выберите id категории</option>
                {categories.map((category) => (
                    <option style={{ width: 210, height: 56, color: '#000' }} key={category.id} value={category.id}>{category.name} - {category.description}</option>
                ))}
            </select>
            <TextField type="text" name="name" placeholder="Название продукта" onChange={handleChange} />
            <TextField type="text" name="description" placeholder="Описание продукта" onChange={handleChange} />
            <TextField type="text" name="cost" placeholder="Цена продукта" onChange={handleChange} />
            <TextField type="text" name="image" placeholder="Ссылка на изображение" onChange={handleChange} />
            <Button onClick={handleSubmit}>Добавить продукт</Button>
        </Card>
    );
};

export default ProductForm;
