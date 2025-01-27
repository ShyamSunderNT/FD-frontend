import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import Navbar from "../components/Navbar";



const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
  
    try {
      const response = await fetch(`https://snacks-sprint-shop.onrender.com/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      // Ensure the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
  
      // Parse the JSON data
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("userEmail", credentials.email);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  

 
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>{<Navbar />}</div>
      <Container>
        <Card className="my-5 bg-glass">
          <Card.Body className="p-5 form-background">
            <Card.Title className="text-center mb-4 text-primary">
              <h1>Welcome Back, Log In</h1>
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  className="inputbox1"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  name="password"
                  required
                  className="inputbox1"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="mt-4">
                <Link to="/forgotPassword" className="text-danger">
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-3">
                <Button className="w-100" type="submit">
                  Log In
                </Button>
              </div>

              <div className="d-flex align-items-center justify-content-center mt-4">
                <hr className="flex-grow-1 mx-2" />
                <span>OR</span>
                <hr className="flex-grow-1 mx-2" />
              </div>

              <div className="d-flex justify-content-center mt-3">
                <span>Log In with:</span>
                <Link to="/request-otp" className="text-success mx-2">
                  OTP
                </Link>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <Link
                  to="/register"
                  className="text-black text-decoration-none"
                >
                  Don't Have an Account?{" "}
                  <span className="text-danger text-decoration-underline">
                    Register
                  </span>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;
