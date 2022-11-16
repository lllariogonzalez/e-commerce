import Card from 'react-bootstrap/Card';
import Star from './Star'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { getReviews } from '../../redux/actions';
import isAdmin from '../../utils/isAdmin';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal';



export default function Coment({ id, rating, comment, createdAt, image, handleDelete }) {


  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const reviews = useSelector(state => state.reviews[0].Reviews);


  const stars = []

  for (let i = 0; i < rating; i++) {
    stars.push(<Star state={true} size='small' />)
  }
  for (let i = 0; i < 5 - rating; i++) {
    stars.push(<Star state={false} size='small' />)
  }

  const [admin, setAdmin] = useState();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const closeModal = () => {
    setOpen(false)
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    isAdmin(getAccessTokenSilently).then((res) => setAdmin(res)).catch(() => setAdmin(false));
    if (reviews.length === 0) dispatch(getReviews());
  }, [admin]);


  function openModal() {
    setOpen(o => !o)
  }

  function handleClick(id) {
    handleClose();
    handleDelete(id);
  }

  return (
    <div className="w-50 my-3 p-3 border border-danger rounded bg-light bg-gradient">
      <div className='d-flex flex-row justify-content-between mt-2'>
        <div className="d-flex justify-content-between">
        {stars.map((star) => {
          return star
        })}
        </div>
        <div>
          <p>{ new Date(createdAt).toLocaleString() } </p>
        </div>
      </div>
      <div>
        <p className='fs-5 text-start'>{comment}</p>
      </div>
      <div className='d-flex flex-row justify-content-center'>
        {image !== null && <img className="w-25 border border-danger rounded" role="button" src={image} alt='product' onClick={openModal}/>}
      </div>
      <div className='d-flex flex-row justify-content-end'>
        {admin && <button className="btn btn-danger mt-4" onClick={handleShow}>Delete comment</button>}
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className='d-flex flex-row justify-content-center'>
          <img className="col-6 rounded" src={image} alt='product'/>
        </div>
      </Popup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action cannot be undone. Are you shure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleClick(id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


