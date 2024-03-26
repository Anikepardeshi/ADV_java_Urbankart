import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components";
import { useEffect, useState } from 'react';
import User from '../models/user';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import AuthenticationService from '../services/authentication.service';
import { setCurrentUser } from '../redux/action';
import {getUserRole} from '../services/base.service';
import { Role } from '../models/role';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginImg from "../images/login.svg";


const Login = () => {
    const [user, setUser] = useState(new User('', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //mounted
    useEffect(() => {
        if (currentUser?.id) {
            navigate('/profile');
        }
    }, []);

 
    const handleChange = (e) => {
        const {name, value} = e.target;

        setUser((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const handleLogin = (e) => {
      e.preventDefault();
      console.log("in Handle Login")
      setSubmitted(true);
      if (!user.email || !user.password) {
        console.log(user.email +" " + user.password)
        return;
      }
      console.log("in Handle Login 22222")
      setLoading(true);
      console.log("email "+user.email+" pwd "+user.password);
      AuthenticationService.login(user).then(response => {
          toast.success("Welcome to UrbanKart "+response.data.firstName ,
          {autoClose: 1500});
          //set user in session.
          dispatch(setCurrentUser(response.data));
          console.log("after dispatch");
          if(getUserRole() === Role.USER)
            navigate('/');
          else
            navigate('/updateproduct');
      }).catch(error => {
         console.log(error);
         setErrorMessage('email or password is not valid.');
         setLoading(false);
      });
    };



  return (
    <>
      <div className="container my-3 py-3">
            <div className="row my-4 h-100">
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <img src={loginImg} className="img-fluid" alt="Login" />
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center" style={{ color: "black", textDecoration: "underline" }}>Login</h1>
                            <hr />
                            {errorMessage &&
                                <div className="alert alert-danger">
                                    {errorMessage}
                                </div>
                            }
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label" style={{ fontWeight: "bold" }}>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="name@example.com"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="invalid-feedback" style={{ color: "red" }}>
                                        Email is required.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label" style={{ fontWeight: "bold" }}>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <p style={{ fontStyle: "italic" }}>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-dark" type="submit" style={{ fontWeight: "bold" }}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <Footer />
    </>
  );
};

export default Login;
