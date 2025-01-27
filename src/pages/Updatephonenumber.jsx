import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./UpdatePhoneNumberModal.css";  // Importing the external CSS file

const UpdatePhoneNumberModal = ({ showModal, handleClose, fetchUserDetails }) => {
  const UserEmail = localStorage.getItem("userEmail");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleInputChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleUpdatePhoneNumber = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://snacks-sprint-shop.onrender.com/api/user/updatephonenumber`, {
        email: UserEmail,
        newPhoneNumber: newPhoneNumber,
      });
      const json = response.data;

      if (json.success) {
        toast.success(json.message);
        setTimeout(() => {
          fetchUserDetails();
          handleClose();
        }, 1500);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Error updating phone number: " + error.message);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered className="update-phone-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Update Phone Number</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleUpdatePhoneNumber}>
          <Form.Group controlId="formNewPhoneNumber">
            <Form.Label>New Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new phone number"
              value={newPhoneNumber}
              onChange={handleInputChange}
              className="phone-input"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="update-btn">
            Update
          </Button>
        </Form>
      </Modal.Body>

      <ToastContainer />
    </Modal>
  );
};

export default UpdatePhoneNumberModal;
