import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Card, Form, Button, Alert, Row, Container, Col } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { countryList } from "../Countries";

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const [sex, setSex] = useState();
    const [country, setCountry] = useState();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        if (auth.currentUser) {
            navigate('/');
        }
    })

    const handleSex = (e) => {
        setSex(e.target.value);
    }

    const handleCountry = (e) => {
        setCountry(e.target.value);
    }

    const handleAccept = (e) => {
        setAccepted(e.target.checked);
    }

    function createUserInDB(id) {
        setDoc(doc(db, "users", id), {
            country: country,
            name: nameRef.current.value,
            sex: sex
        });
    }
    
    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError('Passwords do not match');
        }

        if (!sex) {
            return setError('Please choose a sex');
        }

        if (!country) {
            return setError('Please choose a country');
        }

        if (!accepted) {
            return setError('You must accept the privacy policy and terms of service to register');
        }

        setError('');
        setLoading(true);
        await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                const id = userCredential.user.uid;
                createUserInDB(id);
                sendEmailVerification(userCredential.user);
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-exists' || error.code === 'auth/email-already-in-use') {
                    setError('A user with that email address is already registered');
                } else if (error.code === 'auth/weak-password') {
                    setError('Password must be at least 6 characters long');
                } else {
                    setError('Failed to log in');
                }
            });

        setLoading(false);
    }

  return (
    <>
        <Container className="mt-4 mb-5">
            <Row>
                <Col></Col>
                <Col xs={8}>
                <img
                    src="/tshembo-ffc-logo.jpg"
                    className="img-fluid"
                    alt="React Bootstrap logo"
                />
                </Col>
                <Col></Col>
            </Row>
        </Container>
      <Card className='border-0 shadow-lg custom-card'>
          <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                      <Form.Label className="mt-2 mb-0">Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="name">
                      <Form.Label className="mt-2 mb-0">Full Name</Form.Label>
                      <Form.Control type="textarea" ref={nameRef} required />
                  </Form.Group>
                  <Form.Group id="sex">
                      <Form.Label className="mt-2 mb-0">Sex</Form.Label>
                      <Form.Select onChange={e => (handleSex(e))}>
                        <option>Choose</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                  </Form.Group>
                  <Form.Group id="country">
                      <Form.Label className="mt-2 mb-0">Country</Form.Label>
                      <Form.Select onChange={e => (handleCountry(e))}>
                        <option>Choose</option>
                        {countryList.map(country => (
                            <option value={country}>{country}</option>
                        ))}
                      </Form.Select>
                  </Form.Group>
                  <Form.Group id="password">
                      <Form.Label className="mt-2 mb-0">Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  <Form.Group id="password-confirm">
                      <Form.Label className="mt-2 mb-0">Password confirmation</Form.Label>
                      <Form.Control type="password" ref={passwordConfirmRef} required />
                  </Form.Group>
                  <Form.Check className="mt-3" onChange={e => (handleAccept(e))} label={(<><i>I accept the <a href="https://example.com/more">privacy policy</a> and <a href="https://example.com/more">terms of service</a></i></>)} />
                  <Button disabled={loading} className="w-100 mt-3 custom-btn rounded-pill" type="submit">Sign Up</Button>
              </Form>
          </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 mb-4">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </>
  )
}

export default SignUp