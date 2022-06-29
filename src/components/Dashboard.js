import { Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import Header from '../Header';

const Dashboard = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  async function handleLogOut() {
    await auth.signOut();
    navigate('/');
  }

  function handleSignUp() {
    navigate('/signup');
  }

  function handleWebsite() {
    window.open('https://www.tshemboafricafoundation.com', '_blank');
  }

  function handleDonate() {
    window.open('https://charitysaver.org/d/?v=tshembo-africa-foundation', '_blank');
  }

  if (auth.currentUser) {
    return (
      <>
        <Header />
        <Card className='border-0 shadow-lg custom-card'>
          <Card.Img variant="top" className="p-4" src="/tshembo-ffc-logo.jpg" />
          <Card.Body>
            <Card.Title>Check back soon!</Card.Title>
            <Card.Text>
              Thank you for registering to be part of this challenge.
              Check back in on the 1st of September 2022 when submissions open and 
              log your activities.
            </Card.Text>
            <Button variant="primary" onClick={handleLogOut} className="custom-btn">Log out</Button>
            <Card.Text className="mt-3">
              In the meanwhile, you can learn more about Tshembo Africa Foundation 
              or make a donation.
            </Card.Text>
            <ButtonToolbar>
              <ButtonGroup className="me-2">
                <Button variant="primary" onClick={handleWebsite} className="custom-btn mr-50">Visit website</Button>
              </ButtonGroup>
              <ButtonGroup className="me-2">
            <Button variant="primary" onClick={handleDonate} className="custom-btn">Donate</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <Card className='border-0 shadow-lg custom-card'>
          <Card.Img variant="top" src="/rhino.jpg" />
          <Card.Body>
            <Card.Title>Join the challenge!</Card.Title>
            <Card.Text>
              Once you've registered to be part of the #ForwardForConservation 
              challenge, check back in on the 1st of September 2022 when submissions 
              open and log your activities.
            </Card.Text>
            <Button variant="primary" onClick={handleSignUp} className="custom-btn">Register</Button>
            <Card.Text className="mt-3">
              In the meanwhile, you can learn more about Tshembo Africa Foundation 
              or make a donation.
            </Card.Text>
            <ButtonToolbar>
              <ButtonGroup className="me-2">
                <Button variant="primary" onClick={handleWebsite} className="custom-btn mr-50">Visit website</Button>
              </ButtonGroup>
              <ButtonGroup className="me-2">
            <Button variant="primary" onClick={handleDonate} className="custom-btn">Donate</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Card.Body>
        </Card>
      </>
    )
  }

}

export default Dashboard