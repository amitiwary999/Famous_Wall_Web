/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Card, Input, Button, Modal, ModalBody,
} from 'reactstrap';
import { FAILURE, PENDING, SUCCESS } from '../../common/util';
import firebase from '../../firebase/Firebase';
import logo from '../../img/unicoon.png';
import { setUser } from '../../redux/action/loginAction';
import Spinner from '../../firebase/LoadingSpinner';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  const { loginStatus } = useSelector((state) => ({
    loginStatus: state.login.loginStatus,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus === PENDING) {
      setLoader(true);
    } else if (loginStatus === SUCCESS) {
      setLoader(false);
      props.closeLogin();
    } else if (loginStatus === FAILURE) {
      setLoader(false);
    }
  }, [loginStatus]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmailLink = () => {
    if (email) {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: `${window.location.href}/${email}`,
        handleCodeInApp: true,
      };

      firebase
        .auth()
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {

        })
        .catch((error) => {
          console.log('erroe send email', error);
          // Some error occurred, you can inspect the code: error.code
        });
    } else {
      console.log('no eamil');
    }
  };

  const logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const sendUserInfo = (firebaseUser) => {
    firebaseUser.getIdToken().then((token) => {
      const { email } = firebaseUser;
      const photo = firebaseUser.photoURL;
      const fullName = firebaseUser.displayName;
      const data = {
        name: fullName,
        dp: photo,
        email,
      };

      dispatch(setUser(token, data));
    }).catch((error) => {
      console.log(error);
      logoutUser();
    });
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    dispatch({ type: 'LOGIN_PENDING' });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        sendUserInfo(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const close = () => {
    props.closeLogin();
  };

  return (
    <Modal isOpen toggle={close} className="modal-lg">
      <ModalBody>
        <div className="d-flex">
          <Col md="8" className="text-center justify-content-center align-self-center offset-md-2">
            <Card className="pt-2 pb-2">
              <img src={logo} className="mx-auto" alt="Famous wall" style={{ height: '180px', width: '180px' }} />

              <div className="text-center mt-4">
                <Input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={email}
                  id="email"
                  placeholder="Enter your Email"
                  required
                  style={{ width: '85%' }}
                  className="mx-auto"
                />

                <Button
                  className="mx-auto mt-2"
                  style={{ width: '200px' }}
                  color="primary"
                  type="submit"
                  onClick={sendEmailLink}
                >
                  Send me a login link
                </Button>
                <p className="font-weight-bold mt-6">OR</p>
                <Button
                  className="mx-auto mt-2"
                  style={{ width: '200px' }}
                  color="primary"
                  type="submit"
                  onClick={loginWithGoogle}
                >
                  Login using Google
                </Button>
              </div>
            </Card>
          </Col>
          {loader && <Spinner />}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Login;
