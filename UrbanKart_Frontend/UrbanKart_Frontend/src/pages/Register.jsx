
import React, { useEffect } from 'react'
import { Footer } from "../components";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import User from '../models/user';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import authenticationService from '../services/authentication.service';
import {toast} from 'react-toastify';
import './Registerpage.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import loginImg from "../images/login.svg";

const Register = () => {
    const [user, setUser] = useState(new User('', '', '', '', '', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: ''
    });




    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Clear validation error message when user starts typing
        setValidationErrors(prevState => ({
            ...prevState,
            [name]: '',
        }));
    };

    const handleValidation = () => {
        let errors = {};
        if (!user.firstName || !/^[a-zA-Z]{3,20}$/.test(user.firstName)) {
            errors.firstName = '*Contains only alphabetical characters between 3 and 20 characters long.';
        }
        if (!user.lastName || !/^[a-zA-Z]{3,20}$/.test(user.lastName)) {
            errors.lastName = '*Contains only alphabetical characters between 3 and 20 characters long.';
        }
        if (!user.email || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(user.email)) {
            errors.email = '*Invalid Email';
        }
        if (!user.password || !/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(user.password)) {
            errors.password = '*Password must eight characters including one uppercase letter, one lowercase letter, and one number or special character.';
        }
        if (!user.mobileNumber || !/^[7-9]\d{9}$/.test(user.mobileNumber)) {
            errors.mobileNumber = '*Must be 10 digit or start with 7, 8, 9';
        }
       

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        // Fetch product details
        handleValidation();
    });

    const handleRegister = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Validate fields before submitting
        if (!handleValidation()) {
            return;
        }

        if (!user.firstName || !user.lastName || !user.password || !user.email || !user.role) {
            return;
        }

        setLoading(true);

        if (user.role === 'ADMIN') {
            const adminKey = prompt('Enter secret key for admin registration:');

            if (adminKey !== '1313') {
                setErrorMessage('Invalid admin key');
                setLoading(false);
                return;
            }
        }

        authenticationService.register(user)
            .then(() => {
                toast.success("User Registered Successfully", { autoClose: 1500 });
                navigate('/login');
            })
            .catch((error) => {
                toast.error(`${error.response.data}`, { autoClose: 1500 });
                console.log(error.response.data);
                if (error?.response?.status === 409) {
                    setErrorMessage('Email already exists!!!');
                } else {
                    setErrorMessage(error.errorMessage);
                }
                setLoading(false);
            });
    };

    return (
        <>
            <div class="container my-3 py-3">
                <div class="row my-4 h-100">
                    <div class="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <img src={loginImg} height={450} width={450} />
                        {/* <FontAwesomeIcon icon={faUserCircle} class="ms-auto me-auto user-icon" />  */}
                
                        {errorMessage && (
                            <div class="alert alert-danger">
                                {errorMessage}
                            </div>
                        )}
                    </div>

                    <div class="col-md-8 col-lg-8 col-sm-8 mx-auto">
                        <form onSubmit={(e) => handleRegister(e)} class="my-form" style={{backgroundColor: "#fff"}}>
                        <div class="form-group" >
                            <label for="FName" >First Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="FName"
                                name="firstName"
                                value={user.firstName}
                                placeholder="Enter First Name"
                                required pattern='^[a-zA-Z]{3,20}$'
                                onChange={handleChange}
                            />
                            {validationErrors.firstName && <span className="text-danger">{validationErrors.firstName}</span>}
                        </div>
                        <div class="form-group">
                            <label for="LName" >Last Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="LName"
                                name="lastName"
                                value={user.lastName}
                                placeholder="Enter Last Name"
                                onChange={handleChange}
                                required pattern='^[a-zA-Z]{3,20}$'
                            />
                            {validationErrors.lastName && <span className="text-danger">{validationErrors.lastName}</span>}
                        </div>
                        <div class="form-group">
                            <label for="Email" >Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="Email"
                                name="email"
                                value={user.email}
                                placeholder="name@example.com"
                                onChange={handleChange}
                                required pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
                            />
                            {validationErrors.email && <span className="text-danger">{validationErrors.email}</span>}
                        </div>
                        <div class="form-group">
                            <label for="Password" >Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="Password"
                                name="password"
                                value={user.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                            />
                            {validationErrors.password && <span className="text-danger">{validationErrors.password}</span>}                            
                        </div>
                        <div class="form-group">
                            <label for="Role" >Role</label>
                            <select
                                class="form-control"
                                id="Role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="" >-- select an option --</option>
                                <option value="CUSTOMER">CUSTOMER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="Mobile Number" >Mobile Number</label>
                            <input
                                type="text"
                                class="form-control"
                                id="mobile"
                                name="mobileNumber"
                                minLength={10}
                                maxLength={10}
                                value={user.mobileNumber}
                                placeholder="Mobile Number"
                                onChange={handleChange}
                                required pattern='^[7-9]\d{9}$'
                            />
                            {validationErrors.mobileNumber && <span className="text-danger">{validationErrors.mobileNumber}</span>}
                        </div>

                            <div class="my-3" >
                                <p>
                                    Already have an account? <a href="/login" class="text-decoration-underline text-info">Login</a>
                                </p>
                            </div>
                            <div class="text-center">
                                <button class="my-2 mx-auto btn btn-primary" type="submit" style={{backgroundColor: "#050505"}}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register