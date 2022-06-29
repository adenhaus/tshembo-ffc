import { Modal, Button } from 'react-bootstrap';

const EmailModal = (props) => {
  return (
    <Modal className="w-100"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <iframe width="100%" height="650" src="https://05c8e168.sibforms.com/serve/MUIEAFfyph6fqwCPyn1_jz2qFy2VHPWsegI3i3NJXqob6uSljhLRMb_rpuC3iQ5SMAdp7d4QyU64ENUQEAultoymnOv2l4VvGn11VuYLDg975GsmfL1z_uLryndjBm567rxJ6wfTsSAwbxaHDHSfVxm3UEZbNXuSLLP4lYsoGsFUUN17ydKRLd3EwGHFmdmTSU-n3drcQsSdfCnT" frameborder="0" scrolling="auto" allowfullscreen style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%'}}></iframe>
        <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EmailModal