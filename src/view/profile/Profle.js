/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { fetchProfile } from '../../redux/action/ProfileAction';
import image from '../../img/unicoon.png';

const Profile = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const pathSplit = pathName.split('/');
  const profileId = pathSplit[2];

  const [userProfile, setUserProfile] = useState({});

  const fetchUserProfile = () => {
    const data = { profileId };
    fetchProfile(data)
      .then((res) => {
        setUserProfile(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <Col className="mx-auto" md={4}>
        <Card>
          <CardBody>
            <img
              src={userProfile.userDp}
              alt={userProfile.userName}
              style={{ width: '144px', height: '144px', borderRadius: '50%' }}
            />
            <p>{userProfile.userName}</p>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Profile;
