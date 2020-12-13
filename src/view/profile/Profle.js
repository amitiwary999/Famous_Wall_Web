/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button, Card, CardBody, Col, Row,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchSelfProfile } from '../../redux/action/ProfileAction';
import { AuthContext } from '../../firebase/Auth';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  const location = useLocation();
  const pathName = location.pathname;
  const pathSplit = pathName.split('/');
  const profileId = pathSplit[2];

  const [userProfile, setUserProfile] = useState({});

  const { selfProfile } = useSelector((state) => ({
    selfProfile: state.selfProfile.selfProfile,
  }));

  useEffect(() => {
    setUserProfile(selfProfile);
  }, [selfProfile]);

  const fetchUserProfile = () => {
    const data = { profileId };
    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        dispatch(fetchSelfProfile(token));
      }).catch((error) => {
        console.error(error);
      });
    } else {
      fetchProfile(data)
        .then((res) => {
          setUserProfile(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <Col className="mx-auto" md={5}>
        <Card>
          <CardBody>
            <img
              src={userProfile.userDp}
              alt={userProfile.userName}
              style={{ width: '144px', height: '144px', borderRadius: '50%' }}
            />

            <div>
              <p>{userProfile.userName}</p>
              {!userProfile.selfProfile && (<Button>Request Call</Button>)}
            </div>

          </CardBody>
        </Card>
        <Card className="mt-2">
          <CardBody>
            <Row>
              <Col>
                <div className="col float-left">
                  <p className="float-left font-weight-bold">About Me</p>
                </div>
                <div>
                  <p className="float-left">{userProfile.userBio}</p>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Profile;
