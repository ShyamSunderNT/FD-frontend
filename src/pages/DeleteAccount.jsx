import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./DeleteAccount.css";

const DeleteAccount = ({ showModal, handleClose }) => {
  const UserEmail = localStorage.getItem("userEmail");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAccountDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://snacks-sprint-shop.onrender.com/api/user/deleteuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserEmail,
        password: password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      toast.success("Account Deleted Successfully");
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      toast.error(json.message);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="delete-title">Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAccountDelete}>
          <Form.Group controlId="formDeleteAccount" className="mx-auto">
            <Form.Label className="text-center">
              Are you sure you want to delete your account?
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleInputChange}
              className="password-input"
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 btn btn-danger mt-3">
            Delete
          </Button>
        </Form>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default DeleteAccount;
