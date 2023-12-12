import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthAPI from './AuthAPI';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check authentication
        const authResponse = await AuthAPI.checkAuthentication();
        if (authResponse.status === 200) {
          // Authentication successful, fetch user details
          const accessToken = cookies.get("access_token");
          // console.log(accessToken);
          const userResponse = await axios.get(`${AuthAPI.baseUrl}/user/`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${accessToken}`,
            },
          });

          if (userResponse.status === 200) {
            // console.log(userResponse.data);
            // console.log(userResponse);
            setUserDetails(userResponse.data);
          } else {
            // Handle error while fetching user details
            console.error('Error fetching user details:', userResponse);
          }
        } else {
          // User not authenticated, navigate to login
          navigate('/user/login');
        }
      } catch (error) {
        // Handle general error (e.g., network issues)
        console.error('Error:', error);
        navigate('/user/login');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h1 className='text-center text-bg-success rounded'>User Profile</h1>
      {userDetails ? (
        <div className="card my-5 justify-content-center shadow">
          <div className="card-body">
            <p className="card-text">Id: {userDetails.id}</p>
            <p className="card-text">First Name: {userDetails.first_name}</p>
            <p className="card-text">Last Name: {userDetails.last_name}</p>
            <p className="card-text">Username: {userDetails.username}</p>
            <p className="card-text">Email: {userDetails.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <div className='d-flex justify-content-center bg-secondary rounded p-4 my-5'>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="" />
      </div>
    </div>
  );
};

export default UserProfile;
