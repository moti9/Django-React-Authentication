import axios from "axios";
import { Cookies } from 'react-cookie';


class AuthAPI {
    static baseUrl = "http://127.0.0.1:8000/auth";

    static async SignupUser(body) {
        try {
            const response = await axios.post(`${this.baseUrl}/signup/`, body, {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            // console.log(error.message);
            throw error;
        }
    }

    static async LoginUser(body) {
        try {
            const response = await axios.post(`${this.baseUrl}/login/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            // if (error.response) {
            //     console.error('Server responded with status:', error.response.status);
            //     console.error('Error details:', error.response.data);
            // } else if (error.request) {
            //     console.error('No response received from the server');
            // } else {
            //     console.error('Error during request setup:', error.message);
            // }
            throw error;
        }
    }


    static async logoutUser() {
        try {
            const cookies = new Cookies();
            const refresh_token = cookies.get('refresh_token');
            const access_token = cookies.get('access_token');
            // console.log(access_token);
            // console.log(refresh_token);
            if (refresh_token && access_token) {
                const response = await axios.post(`${this.baseUrl}/logout/`, { "refresh_token": refresh_token }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access_token}`,
                    },
                });
                return response;
            }
            else {
                throw new Error('Both refresh_token and access_token are required for logout.');
            }
        } catch (error) {
            // console.log(error.message);
            throw error;
        }
    }
    
    static async checkAuthentication() {
        try {
            // console.log("Check Authentication");
            const cookies = new Cookies();
            const accessToken = cookies.get('access_token');
            const refreshToken = cookies.get('refresh_token');
            
            // console.log('Access token:', accessToken);
            // console.log('Refresh token:', refreshToken);
    
            if (!accessToken || !refreshToken) {
                throw new Error("Access token and refresh token are required");
            }
    
            try {
                const accessResponse = await axios.post(`${this.baseUrl}/token/verify/`, { token: accessToken }, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                });
    
                // console.log("In Access");
                return accessResponse;
            } catch (accessError) {
                if (accessError.response && accessError.response.status === 401) {
                    const responseData = accessError.response.data;
    
                    if (responseData && responseData.code === "token_not_valid") {
                        // Access token is expired or invalid, try refreshing
                        const refreshResponse = await axios.post(`${this.baseUrl}/token/refresh/`, { refresh: refreshToken }, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
    
                        if (refreshResponse.status === 200) {
                            // Refresh successful, update access token in cookies
                            cookies.set("access_token", refreshResponse.data.access);
                            return refreshResponse;
                        } else {
                            throw new Error("Unable to refresh token, please login");
                        }
                    }
                }
    
                // Other access token verification errors
                throw new Error("Invalid tokens, please login");
            }
        } catch (error) {
            // console.error(error.message);
            return Promise.reject(error);
        }
    }
};

export default AuthAPI;

// static async refreshAccessToken(refresh_token) {
//     try {
//         const cookies = new Cookies();
//         const refresh_token = cookies.get('refresh_token');
//         if (refresh_token) {
    //             const response = await axios.post(`${this.baseUrl}/token/refresh/`, { 'refresh': refresh_token }, {
        //                 headers: {
            //                     "Content-Type": 'application/json',
//                 },
//             });

//             // Update the access token in the cookies
//             if (response.status === 200) {
//                 cookies.set('access_token', response.data.access);
//             }
//             else {
//                 throw new Error('Invalid refresh token, please login again');
//             }
//         }
//         else {
//             throw new Error('refresh_token is required for refreshing tokens');
//         }
//     } catch (error) {
    //         // console.log(error.message);
    //         throw error;
    //     }
    // };
    



// static async verifyAuthToken(token) {
//     try {
    //         console.log(token);
    //         const response = await axios.post(`${this.baseUrl}/token/verify/`, { 'token': token }, {
        //             headers: {
        //                 "Content-Type": 'application/json',
        //             },
        //         });
        
        //         // console.log(response.status);
        //         // console.log(response);

//         return response;
//     }
//     catch (error) {
    //         // console.log(error.message);
    //         console.log("error in verification");
    //         // throw error;
    //     }
    // }
    
    
    // static async checkAuthentication() {
    //     try {
        //         const cookies = new Cookies();
        //         const accessToken = cookies.get('access_token');
        //         const refreshToken = cookies.get('refresh_token');
        //         // console.log(accessToken);
        //         // console.log(refreshToken);
        
        //         if (accessToken && refreshToken) {
            //             const accessResponse = await this.verifyAuthToken(accessToken);
    //             if (accessResponse.status === 200) {
        //                 return accessResponse;
    //             }
    //             else if(accessResponse.status === 401) {
        //                 console.log("We are in refresh token verification");
        //                 const refreshResponse = await this.verifyAuthToken(refreshToken);
        //                 if (refreshResponse.status === 200) {
            //                     this.refreshAccessToken(refreshToken);
    //                 }
    //                 else {
    //                     throw new Error("No valid tokens, please login");
    //                 }
    //             }
    //         }
    //         else {
    //             throw new Error("access token required");
    //         }
    //     } catch (error) {
    //         // console.log(error.message);
    //         throw error;
    //     }
    // }
    



    // static async checkAuthentication() {
    //     try {
    //         const cookies = new Cookies();
    //         const accessToken = cookies.get('access_token');
    //         const refreshToken = cookies.get('refresh_token');
    //         // console.log(accessToken);
    //         // console.log(refreshToken);
    
    //         if (accessToken && refreshToken) {
    //             const accessResponse = await axios.post(`${this.baseUrl}/token/verify/`, { 'token': accessToken }, {
    //                 headers: {
    //                     "Content-Type": 'application/json',
    //                 },
    //             });
    //             console.log(accessResponse);
    
    //             if (accessResponse.status === 200) {
    //                 console.log("in access");
    //                 return accessResponse;
    //             }
    //             else if (accessResponse.status === 401) {
    //                 console.log("We are in refresh token verification");
    //                 const refreshResponse = await axios.post(`${this.baseUrl}/token/verify/`, { 'token': refreshToken }, {
    //                     headers: {
    //                         "Content-Type": 'application/json',
    //                     },
    //                 });
    
    //                 if (refreshResponse.status === 200) {
    //                     const response = await axios.post(`${this.baseUrl}/token/refresh/`, { 'refresh': refreshToken }, {
    //                         headers:{
    //                             "Content-Type": "application/json",
    //                         }
    //                     });  
    //                     if(response.status === 200)
    //                     {
    //                         cookies.set("access_token", response.data.access);
    //                     }
    //                     else
    //                     {
    //                         throw new Error("No valid tokens, please login");
    //                     }
    //                 }
    //                 else {
    //                     throw new Error("No valid tokens, please login");
    //                 }
    //             }
    //         }
    //         else {
    //             throw new Error("access token required");
    //         }
    //     } catch (error) {
    //         // console.log(error.message);
    //         throw error;
    //     }
    // }