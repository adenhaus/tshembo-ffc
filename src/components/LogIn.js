import { Card, Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        if (auth.currentUser) {
            navigate('/');
        }
    })
  
    async function handleSubmit(e) {
        e.preventDefault();

        setError('');
        setLoading(true);
        await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    setError('There is no registered user with that email address');
                } else if (error.code === 'auth/wrong-password') {
                    setError('Incorrect password');
                } else {
                    setError('Failed to log in');
                }
            })
  
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
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="custom-btn w-100 mt-3 rounded-pill" type="submit">Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 mb-4">
        <p>Need an account? <Link to="/signup">Sign up</Link><br />Forgot password? <Link to="">Reset</Link></p>
        </div>
      </>
    )
  }
  
export default LogIn