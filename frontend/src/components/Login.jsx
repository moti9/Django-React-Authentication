import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AuthAPI from './AuthAPI';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['access_token', 'refresh_token']);

    const submit = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };

        try {
            const response = await AuthAPI.LoginUser(user);
            // console.log(response);
            setCookie('access_token', response.access);
            setCookie('refresh_token', response.refresh);
            navigate("/");
        } catch (error) {
            console.error("Error in token fetch: ", error.message);
        }
    };

    const handleReset = () => {
        setUsername('');
        setPassword('');
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthAPI.checkAuthentication();
                // console.log(response);
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center my-5">Sign In</h3>
                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        className="form-control my-2"
                                        placeholder="Enter Username"
                                        name="username"
                                        type="text"
                                        value={username}
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control my-2"
                                        placeholder="Enter password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-center my-2">
                                    <button type="submit" className="btn btn-primary m-2">
                                        Submit
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
            <div className='d-flex justify-content-center bg-secondary rounded p-4 my-5'>
                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="" />
            </div>
        </div>
    );
};

export default Login;
