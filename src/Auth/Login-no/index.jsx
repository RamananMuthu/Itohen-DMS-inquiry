import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Btn, H4, P } from '../../AbstractElements';
import { EmailAddress, ForgotPassword, LoginWithJWT, Password, RememberPassword, SignIn } from '../../../Constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { firebase_app, Jwt_token } from '../../Config/Config';
import man from '../../assets/images/dashboard/1.png';
import { handleResponse } from '../../Services/fack.backend';
import SocialAuth from './SocialAuth';

const Login = ({ selected }) => {
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('test123');
    const [loading, setLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const history = useNavigate();

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );
    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    useEffect(() => {
      //  localStorage.setItem('profileURL', value);
       // localStorage.setItem('Name', name);
    }, [value, name]);

    const loginAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setValue(man);
        setName('Emay Walter');
        setEmail('test@gmail.com');
        setPassword('test123');
        try {
            await firebase_app.auth().signInWithEmailAndPassword(email, password).then(function () {
                setValue(man);
                setName('Emay Walter');
                setTimeout(() => {
                    history(`${process.env.PUBLIC_URL}/inquiry/inquiryform/default`);
                }, 200);
            });
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                toast.error('Oppss.. The password is invalid or the user does not have a password.');
            }, 200);
        }
    };

    const loginWithJwt = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: ({ email, password })
        };

        return fetch('/users/authenticate', requestOptions)
            .then(handleResponse)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                setValue(man);
                setName('Emay Walter');
                localStorage.setItem('token', Jwt_token);
                window.location.href = `${process.env.PUBLIC_URL}/inquiry/inquiryform/default`;
                return user;
            });
    };


    return (
        <Fragment>
            <section>
                <Container fluid={true}>
                    <Row>
                        <Col xl="7 order-1">
                            <Image 
                            attrImage={{ className: "bg-img-cover bg-center", 
                            src: `${require("../../../assets/images/login/1.jpg")}`,
                             alt: "loginpage" }} />
                        </Col>
                        <Col xl="5 p-0">
                            <Fragment>
                                <div className="login-card">
                                    <Form className="theme-form login-form">
                                        <H4>Login</H4>
                                        <H6>Welcome anitha back! Log in to your account.</H6>
                                        <FormGroup>
                                            <Label>Email Address</Label>
                                            <div className="input-group"><span className="input-group-text"><i className="icon-email"></i></span>
                                                <Input className="form-control" type="email" required="" placeholder="Test@gmail.com" />
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="position-relative">
                                            <Label>Password</Label>
                                            <div className="input-group"><span className="input-group-text"><i className="icon-lock"></i></span>
                                                <Input className="form-control" type="password" name="login[password]" required="" placeholder="*********" />
                                                <div className="show-hide"><span className="show">                         </span></div>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="checkbox">
                                                <Input id="checkbox1" type="checkbox" />
                                                <Label className="text-muted" for="checkbox1">Remember password</Label>
                                            </div><a className="link" href="forget-password.html">Forgot password?</a>
                                        </FormGroup>
                                        <FormGroup>
                                            <Btn attrBtn={{ className: 'btn-block', color: 'primary', type: 'submit' }} >Sign in</Btn>
                                        </FormGroup>
                                        <div className="login-social-title">
                                            <H5>Sign in with</H5>
                                        </div>
                                        
                                        <P>Don't have account?<a className="ms-2" href="sign-up.html">Create Account</a></P>
                                    </Form>
                                </div>
                            </Fragment>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default Login;