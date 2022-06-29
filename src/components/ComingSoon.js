import { Button, Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import EmailModal from './EmailModal';

const ComingSoon = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Stack gap={2} className="d-flex align-items-center justify-content-center">
        <img
            src="/tshembo-ffc-logo.jpg"
            className="img-fluid"
            alt="React Bootstrap logo"
        />
        <img
            src="/undraw-jogging.png"
            className="img-fluid"
            alt="React Bootstrap logo"
        />
        <p className="text-center">Welcome to Tshembo Africa Foundation's #ForwardForConservation challenge! Registration opens on the 17th of July.</p>
        <Button variant="outline-secondary" onClick={() => setModalShow(true)}>
        Register for updates
      </Button>
      <EmailModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Stack>
  )
}

export default ComingSoon