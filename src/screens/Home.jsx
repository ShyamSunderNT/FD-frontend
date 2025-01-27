import React, { useState } from "react";
import food_items from "./data/food_items.json";
import foodCategory from "./data/food_catagories.json";
import Card from "../components/Card";
import { ToastContainer } from "react-toastify";
import "./Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const [search, setSearch] = useState("");

  const carouselImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
  ];

  return (
    <div>
      {/* Navbar placeholder */}
      <div>{ <Navbar /> }</div>

      {/* Carousel */}
      <div className="carousel-container">
  <div
    id="homeCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-inner">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <img
            src={image}
            className="d-block w-100 carousel-img"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#homeCarousel"
      data-bs-slide="prev"
    >
      <span
        className="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#homeCarousel"
      data-bs-slide="next"
    >
      <span
        className="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>

  {/* Search Bar */}
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search for food items..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>

      {/* Food Categories */}
      <div className="container">
        {foodCategory.map((category) => (
          <div key={category.id}>          
            <h2 className="category-title">{category.CategoryName}</h2>           
            <div className="cards-grid">
              {food_items
                .filter(
                  (item) =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <Card
                    key={item.id}
                    foodName={item.name}
                    item={item}
                    options={item.options[0]}
                    ImgSrc={item.img}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
