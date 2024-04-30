import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';



const Navigation = () => {

    let { user } = useParams()
    return (
        <AppBar position="static" sx={{ backgroundColor: '#ff9100' }}>
            <Toolbar>
                <Button component={Link} to="/" color="inherit">Выход</Button>
                <Button component={Link} to={`/${user}/products`} color="inherit">Каталог</Button>
                <Button component={Link} to={`/${user}/mybuys`} color="inherit">Мои покупки</Button>
                {user === 'admin' ?
                    <Button component={Link} to={`/${user}/dashboard`} color="inherit">Dashboard</Button>
                    : null}
            </Toolbar >
        </AppBar >
    );
};

export default Navigation;
