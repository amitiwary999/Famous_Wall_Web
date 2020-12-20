/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button, Card, CardBody, Col, Row, Spinner,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, Edit, X } from 'react-feather';
import Dropzone from 'react-dropzone';
import RichTextEditor from 'react-rte';
import dompurify from 'dompurify';
import useFormless from 'react-useformless';
import { fetchProfile, fetchSelfProfile, updateProfile } from '../../redux/action/ProfileAction';
import { AuthContext } from '../../firebase/Auth';
import { IMAGE_MEDIA, notify, uploadMedia } from '../../common/util';
import './profile.scss';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const sanitizer = dompurify.sanitize;

  const location = useLocation();
  const pathName = location.pathname;
  const pathSplit = pathName.split('/');
  const profileId = pathSplit[2];
  const [imageLoader, showImageLoader] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [userProfile, setUserProfile] = useState({ });

  const { selfProfile } = useSelector((state) => ({
    selfProfile: state.selfProfile.selfProfile,
  }));

  const initialValues = { userBio: RichTextEditor.createEmptyValue() };
  const {
    values, errors, setValue, inputProps,
  } = useFormless({
    initialValues,
  });

  useEffect(() => {
    if (selfProfile.userBio) {
      setValue('userBio', RichTextEditor.createValueFromString(selfProfile.userBio, 'html'));
    }

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

  const uploadDp = (mediaFile) => {
    showImageLoader(true);
    uploadMedia(mediaFile, IMAGE_MEDIA)
      .then((url) => {
        saveProfileDp(url);
      })
      .catch((error) => {
        console.error(error);
        showImageLoader(false);
        notify('Oops! Something went wrong', 'danger', 'Error');
      });
  };

  const onAboutChange = (value) => {
    setValue('userBio', RichTextEditor.createValueFromString(value, 'html'));
  };

  const saveAbout = () => {
    if (values.userBio.toString('html')) {
      const data = userProfile;
      data.userBio = values.userBio.toString('html');

      currentUser.getIdToken().then((token) => {
        updateProfile(token, data)
          .then((res) => {
            setUserProfile(data);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  };

  const saveProfileDp = (dp) => {
    const data = userProfile;
    data.userDp = dp;
    currentUser.getIdToken().then((token) => {
      updateProfile(token, data)
        .then((res) => {
          setUserProfile(data);
          showImageLoader(false);
        })
        .catch((error) => {
          console.error(error);
          showImageLoader(false);
        });
    });
  };

  return (
    <div>

      <Col className="mx-auto" md={5}>
        <Card>
          <CardBody>
            <div>
              <div style={{ position: 'relative' }}>
                <img
                  src={userProfile.userDp}
                  alt={userProfile.userName}
                  style={{ width: '144px', height: '144px', borderRadius: '50%' }}
                />
                {imageLoader && (
                <div className="overlay">
                  <Spinner />
                </div>
                )}
              </div>

              <div style={{ left: '55%', bottom: '25%', position: 'absolute' }}>
                <Dropzone
                  accept="image/*"
                  onDrop={(acceptedFiles) => {
                    console.log(acceptedFiles);
                    uploadDp(acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Edit style={{
                          width: '24px', height: '24px', cursor: 'pointer',
                        }}
                        />
                      </div>
                    </section>
                  )}

                </Dropzone>
              </div>
            </div>
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
                <div className="col float-left">
                  {!editAbout ? (
                    <p
                      className="float-left"
                      dangerouslySetInnerHTML={{
                        __html: sanitizer(
                          userProfile.userBio,
                        ),
                      }}
                    />
                  ) : (
                    <div>
                      <RichTextEditor value={values.userBio} onChange={onAboutChange} />
                      <div className="float-right">
                        <button
                          onClick={saveAbout}
                          className="btn btn-primary btn-sm mt-1 mr-1 mb-2"
                        >
                          <CheckCircle />
                        </button>
                        <button
                          onClick={() => {
                            setValue('userBio', RichTextEditor.createValueFromString(selfProfile.userBio, 'html'));
                            setEditAbout(false);
                          }}
                          className="btn btn-danger btn-sm mb-2 mt-1"
                        >
                          <X />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Edit onClick={() => setEditAbout(true)} />
            </Row>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Profile;
