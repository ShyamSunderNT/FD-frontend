import React, { useState } from 'react';
import { Container, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "./register.css";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';



const Register = () => {
  const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        phoneNumber: "",
      });

      const [selectedImage, setSelectedImage] = useState(null);

      
      const handleLocationFetch = async () => {
        try {
          const getLocation = () =>
            new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
    
          const position = await getLocation();
          const { latitude, longitude } = position.coords;
    
          const { data } = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/locationupdate", {
            latlong: { lat: latitude, long: longitude },
          });
    
          setCredentials((prev) => ({ ...prev, location: data.location }));
        } catch (error) {
          toast.error("Unable to fetch location. Please try again.");
          console.error("Location error:", error.message);
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedImage(file);
          console.log("Selected file:", file);
        } else {
          console.error("No file selected");
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", credentials.name);
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("confirmPassword", credentials.confirmPassword);
        formData.append("location", credentials.location);
        formData.append("phoneNumber", credentials.phoneNumber);
        formData.append("img", selectedImage); // Append file
        try {
          const { data } = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/signup", formData);
          if (!data.success) {
            toast.error(data.message);
          } else {
            toast.success(data.message);
            localStorage.setItem("authToken", data.authToken);  // Store the token
            localStorage.setItem("userEmail", credentials.email);
      
            navigate("/login"); 
          }
        } catch (error) {
          toast.error("Signup failed. Please try again.");
        }
      };
    return (
        <div>
          <div>{ <Navbar /> }</div>
            <Container>
        <Card className="my-4 bg-glass card form-group">
          <Card.Body className="p-5 form-background">
            <Card.Title className="title">
              <h1>Create an Account</h1>
            </Card.Title>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  required
                  className="shared-input"
                  placeholder="Name"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  required
                  className="shared-input"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  required
                  className="shared-input"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  required
                  className="shared-input"
                  placeholder="Confirm Password"
                  value={credentials.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
               <Form.Control
    type="text"
    name="phoneNumber"
    required
    className="shared-input"
    placeholder="Phone Number"
    value={credentials.phoneNumber}
    onChange={handleChange}
  />
</Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="location"
                  required
                  className="shared-input"
                  placeholder="Click below to get current location"
                  value={credentials.location}
                  onChange={handleChange}
                />
                <div className="d-flex justify-content-between mt-1">
                  <Button variant="link" className="fetch-location" onClick={handleLocationFetch}>
                    Fetch Current Location
                  </Button>
                </div>
                <div className="profilepic">
                  {selectedImage && (
                    <div className="image-preview">
                      <img
                        alt="Preview"
                        src={URL.createObjectURL(selectedImage)}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    className="select"
                    name="img"
                    onChange={handleFileChange}
                  />
                </div>
              </Form.Group>
              <Button className="register-button" type="submit">
                Register
              </Button>
              <div className="d-flex justify-content-center mt-4">
                <Link to="/login" className="already-user">
                  Already a User?{" "}
                  <span>LOGIN</span>
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

export default Register;