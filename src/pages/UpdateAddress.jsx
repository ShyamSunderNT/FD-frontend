import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./UpdateAddress.css";

const UpdateAddress = ({ showModal, handleClose, fetchUserDetails }) => {
  const UserEmail = localStorage.getItem("userEmail");
  const [newAddress, setNewAddress] = useState("");

  const handleInputChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://snacks-sprint-shop.onrender.com/api/user/updateaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: UserEmail,
          newAddress: newAddress,
        }),
      });
      const json = await response.json();

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
      toast.error(error.message);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>Update Address</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleUpdateAddress}>
          <Form.Group controlId="formNewAddress">
            <Form.Label>New Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new address"
              value={newAddress}
              onChange={handleInputChange}
              className="address-input"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="update-btn">
            UPDATE
          </Button>
        </Form>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default UpdateAddress;
