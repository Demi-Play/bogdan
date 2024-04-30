import React from 'react';
import Navigation from './Nav';
import CategoryForm from '../data/CategoryForm';
import ProductForm from '../data/ProductForm';

const Dashboard = () => {
    return (
        <div style={{ minWidth: 400, minHeight: 600 }}>
            <Navigation />
            <CategoryForm />
            <ProductForm />
        </div>
    );
}

export default Dashboard;
