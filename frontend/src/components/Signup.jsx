import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from './AuthAPI';

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform password match validation
        if (user.password !== user.password2) {
            alert('Passwords do not match!');
            return;
        }

        // Make API call to create a new user
        try {
            const response = AuthAPI.SignupUser(user);
            console.log(response);
            navigate('/user/login'); // Redirect to login page after successful signup
        } catch (error) {
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Error details:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during request setup:', error.message);
            }
        }
    };

    const handleReset = () => {
        setUser({
            username: '',
            email: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
        });
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthAPI.checkAuthentication();
                if (response.status == 200) {
                    navigate("/");
                }
            }
            catch (error) {
                console.log("Please login");
            }
        }
        checkAuth();
    }, [navigate]);

    return (

        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-3">Sign Up</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        value={user.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        value={user.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        value={user.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-center my-2">
                                    <button type="submit" className="btn btn-primary m-2">
                                        Sign Up
                                    </button>

                                    <button type="button" className="btn btn-danger m-2" onClick={handleReset}>
                                        Reset
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
