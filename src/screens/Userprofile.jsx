import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import UpdatePhoneNumberModal from '../pages/Updatephonenumber';
import UpdateAddress from '../pages/UpdateAddress';
import DeleteAccount from '../pages/DeleteAccount';
import "./UserProfile.css"; // Import the new CSS file


const Userprofile = () => {
    const [credentials, setCredentials] = useState({
        userName: "",
        userAddress: "",
        userPhoneNumber: "",
        userImage: null,
      });
    
      const userEmail = localStorage.getItem("userEmail");
      const [error, setError] = useState(null);
      const [showUpdatePhoneModal, setShowUpdatePhoneModal] = useState(false);
      const [showAddressModal, setShowAddressModal] = useState(false);
      const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    
      const handleShowUpdatePhoneModal = () => setShowUpdatePhoneModal(true);
      const handleClosePhoneModal = () => setShowUpdatePhoneModal(false);
      const handleShowAddressModal = () => setShowAddressModal(true);
      const handleCloseAddressModal = () => setShowAddressModal(false);
      const handleShowDeleteAccountModal = () => setShowDeleteAccountModal(true);
      const handleCloseDeleteAccountModal = () => setShowDeleteAccountModal(false);
    
      const getUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:4001/api/user/getuserdetails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userEmail,
            }),
          });
      
          const json = await response.json();
          console.log("Response from server:", json); // Debug log
      
          if (response.ok && json.success) {
            setCredentials({
              userName: json.userName || "", // Use empty string as fallback
              userAddress: json.userAddress || "",
              userPhoneNumber: json.userPhoneNumber || "",
              userImage: json.userImage || null, // Set null if no image is provided
            });
            localStorage.setItem("userName", json.userName);
          } else {
            setError(json.message || "Failed to fetch user details.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          setError(error.message || "An unexpected error occurred.");
        }
      };
      useEffect(() => {
        getUserDetails();
      }, []);
    return (
        <div className="profile-container">
      <Navbar />
      <Card className="mb-3 my-5 profile-card">
        <Row className="g-0">
          <Col
            md="4"
            className="gradient-custom text-center text-white profile-image-section"
          >
            {credentials.userImage ? (
              <Card.Img
                src={`data:${credentials.userImage.contentType};base64,${credentials.userImage.data}`}
                alt="User Avatar"
                className="my-5 rounded-circle profile-img"
              />
            ) : (
              <Card.Img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Default Avatar"
                className="my-5 rounded-circle profile-img"
              />
            )}
            <Card.Title className="profile-username">
              {credentials.userName && credentials.userName.toUpperCase()}
            </Card.Title>
            <Card.Text className="profile-occupation"></Card.Text>
          </Col>
          <Col md="8">
            <Card.Body className="p-4">
              <Card.Title as="h6">Information</Card.Title>
              <hr className="mt-0 mb-4" />
              <Row className="pt-1">
                <Col size="6" className="mb-3">
                  <Card.Title as="h6">Email</Card.Title>
                  <Card.Text className="text-muted">{userEmail}</Card.Text>
                </Col>
                <Col size="6" className="mb-3">
                  <Card.Title as="h6">Phone</Card.Title>
                  <Card.Text className="text-muted">
                    {credentials.userPhoneNumber}
                    <button className="btn" onClick={handleShowUpdatePhoneModal}>
                      <i
                        className="far fa-edit"
                        style={{
                          fontSize: "14px",
                        }}
                      ></i>
                    </button>
                  </Card.Text>
                </Col>
              </Row>
              <hr className="mt-0 mb-4" />
              <Row className="pt-1">
                <Col size="3" className="mb-3">
                  <Card.Title as="h6">Address</Card.Title>
                  <Card.Text className="text-muted">
                    {credentials.userAddress}
                    <button className="btn" onClick={handleShowAddressModal}>
                      <i
                        className="far fa-edit"
                        style={{
                          fontSize: "14px",
                        }}
                      ></i>
                    </button>
                  </Card.Text>
                </Col>
                <Col size="3" className="">
                  <Button
                    className="btn btn-danger text-white"
                    style={{ backgroundColor: "#ED1B19" }}
                    onClick={handleShowDeleteAccountModal}
                  >
                    Delete Account
                  </Button>
                </Col>
              </Row>
              <div className="d-flex justify-content-start">
                <Link to="">
                  <i className="fab fa-facebook me-3"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-twitter me-3"></i>
                </Link>
                <Link to="">
                  <i className="fab fa-instagram me-3"></i>
                </Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <UpdatePhoneNumberModal
        showModal={showUpdatePhoneModal}
        handleClose={handleClosePhoneModal}
        fetchUserDetails={getUserDetails}
      />
      <UpdateAddress
        showModal={showAddressModal}
        handleClose={handleCloseAddressModal}
        fetchUserDetails={getUserDetails}
      />
      <DeleteAccount
        showModal={showDeleteAccountModal}
        handleClose={handleCloseDeleteAccountModal}
      />
    </div>
    );
};

export default Userprofile;