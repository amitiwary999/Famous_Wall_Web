import React, {useState} from 'react'
import { Col, Card, Container, Input, Button, Modal, ModalBody } from 'reactstrap';
import firebase from '../../firebase/Firebase'
import logo from '../../img/unicoon.png'


const Login = (props) => {
    const [email, setEmail] = useState('');

    const handleChange = e => {
        setEmail(e.target.value);
    };

    const sendEmailLink = () => {
        if (email) {
            const actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be whitelisted in the Firebase Console.
                url: `${window.location.href}/${email}`,
                handleCodeInApp: true
            };

            firebase
                .auth()
                .sendSignInLinkToEmail(email, actionCodeSettings)
                .then(() => {
                   
                })
                .catch(error => {
                    console.log('erroe send email', error);
                    // Some error occurred, you can inspect the code: error.code
                });
        } else {
            console.log('no eamil');
        }
    };

    const loginWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                props.closeLogin();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const close = () => {
        props.closeLogin();
    }

    return(
        <Modal isOpen={true} toggle={close} className="modal-lg">
            <ModalBody>
        <div className="d-flex" style={{ height: '100vh', background: 'grey' }}>
            <Col md="8" className="text-center justify-content-center align-self-center offset-md-2">
                <Card className="pt-2 pb-2">
                    <img src={logo} className="mx-auto" style={{ height: '180px', width: '180px' }}/>
      
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
                            onClick={sendEmailLink}>
                            Send me a login link
                        </Button>
                        <p className="font-weight-bold mt-6">OR</p>
                        <Button
                            className="mx-auto mt-2"
                            style={{ width: '200px' }}
                            color="primary"
                            type="submit"
                            onClick={loginWithGoogle}>
                            Login using Google
                        </Button>
                    </div>
                </Card>
            </Col>
        </div>
        </ModalBody>
       </Modal>
    )
}

export default Login;