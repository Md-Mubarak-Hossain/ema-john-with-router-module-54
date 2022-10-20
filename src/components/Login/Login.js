

import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { AuthContext } from '../UserContext/UserContext';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;
    const { user, signIn } = useContext(AuthContext);
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                navigate(from, { replace: true });
                console.log(user);
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='container'>
            <Form onSubmit={handleSubmit} className='mx-auto width p-5  mt-3  rounded border'>
                <div ><h2 className='text-center mb-3 text-uppercase'>Log In</h2></div>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name='email' type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </div>
                <div>
                    <small> New in ema-john?<Link to='/signup'>SignUp</Link></small>
                </div>
            </Form>
            <p>{user?.email}</p>
        </div>
    );
};

export default Login;