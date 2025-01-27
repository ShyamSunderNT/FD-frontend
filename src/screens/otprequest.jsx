import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./otpVerify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Otprequest = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const { data } = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/requestLoginOtp", { email });

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Error during OTP request:", error.response?.data || error.message);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const { data } = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/loginWithOtp", { email, otp });

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        // Redirect to the desired page after successful verification
        navigate("/");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.response?.data || error.message);
      toast.error("OTP verification failed. Please try again.");
    }
  };

  return (
    <div>
      <div>{ <Navbar /> }</div>
      <Container>
        <Card className="my-4 bg-glass card form-group">
          <Card.Body className="p-5 form-background">
            <Card.Title className="title">
              <h1>{isOtpSent ? "Verify OTP" : "Request OTP"}</h1>
            </Card.Title>
            <Form onSubmit={isOtpSent ? handleVerifyOtp : handleRequestOtp}>
              {!isOtpSent && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    className="shared-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Group>
              )}
              {isOtpSent && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="otp"
                    required
                    className="shared-input"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </Form.Group>
              )}
              <Button className="verify-button" type="submit">
                {isOtpSent ? "Verify" : "Request OTP"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Otprequest;
