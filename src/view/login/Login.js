import React, {useState} from 'react'
import { Col, Card, Container, Input, Button } from 'reactstrap';
import firebase from '../../firebase/Firebase'
import logo from '../../img/unicoon.png'


const Login = () => {
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

    return(
        <Container className="d-flex" style={{ minHeight: '88vh' }}>
            <Col md="8" className="text-center justify-content-center align-self-center offset-md-2">
                <Card className="pt-2 pb-2">
                    <img src={logo} />
      
                    <div className="text-center">
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
                            className="mx-auto mt-1 py-1"
                            style={{ width: '200px' }}
                            color="primary"
                            type="submit"
                            onClick={sendEmailLink}
                        >
                            Send me a login link
            </Button>
                    </div>
                </Card>
            </Col>
        </Container>
    )
}

export default Login;