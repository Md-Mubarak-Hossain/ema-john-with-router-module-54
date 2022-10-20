import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';

import './SignUp.css'

const SignUp = () => {

    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);
    const { createUser } = useContext(AuthContext);


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(name, email, password, confirm);



        if (password.length < 6) {
            setError(true);
            setError('Password should be 6 or more characters!!!');
            setError1(false);
            return;
        }
        else if (password !== confirm) {
            setError1(true);
            setError1('Password is not match!!!');
            setError(false);
            return;
        }
        else {
            createUser(email, password, confirm)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                })
                .catch(error => console.error(error))

            form.reset();
            setError(false)
            setError1(false)
            alert('Successfully registered!!!');
        }
    }
    return (
        <div className='container my-5'>
            <Form onSubmit={handleSubmit} className='mx-auto width p-5  mt-3  rounded border'>

                <div><h2 className='text-center mb-3 text-uppercase'>Sign Up</h2></div>
                <div>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" />
                    </Form.Group>
                    <p className='text-danger'>{error}</p>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name='confirm' placeholder="Confirm Password" />
                    </Form.Group>
                    <p className='text-danger'>{error1}</p>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </div>
                <div>
                    <small>Already have an account?<Link to='/login'>Log in</Link></small>
                </div>
            </Form>

        </div>
    );
};

export default SignUp;