import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; // Importing axios
import "./Feedback.css"; // Import external CSS

export default function Feedback() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  let navigate = useNavigate();

  const AuthToken = localStorage.getItem("authToken");

  const ContactFormHandler = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!credentials.name || !credentials.email || !credentials.feedback) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    try{


    const response = await axios.post('https://snacks-sprint-shop.onrender.com/api/user/feedback', {
        name: credentials.name,
        email: credentials.email,
        feedback: credentials.feedback,
      }, {
        headers: {
          "Content-Type": "application/json", // Make sure this header is set
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // if needed
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Network error or server down. Please try again later.");
      console.error("Error in form submission:", error);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />

      <Container>
        <Card
          className="feedback-card my-5"
        >
          <Card.Body
            className="form-background"
          >
            <Card.Title className="text-center mb-4 text-primary">
              <h1>Feedback Form</h1>
            </Card.Title>
            <Form onSubmit={ContactFormHandler}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="Name"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="feedback"
                  className="input-field"
                  placeholder="Enter Your Feedback here"
                  value={credentials.feedback}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="mt-4">
                <Button className="w-100" type="submit">
                  Submit
                </Button>
              </div>

              {!AuthToken && (
                <div className="d-flex justify-content-center mt-4">
                  <Link to="/createuser" className="text-black text-decoration-none">
                    Don't Have an Account? <span className="text-danger">Register</span>
                  </Link>
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <ToastContainer />
    </div>
  );
}
