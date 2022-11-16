import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddComment from '../../Reviews/AddComment';

export default function ModalComentProduct(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Comment and rate your product(s)
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <AddComment 
                products={props.products}
                email={props.email} 
                idOrder={props.idOrder} 
                block={props.block} 
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

