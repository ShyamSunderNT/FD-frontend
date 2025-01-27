import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { toast } from "react-toastify";
import "./Card.css";

export default function Card(props) {
  const data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const dispatch = useDispatchCart();
  let options = props.options;
  let foodItem = props.item;
  let priceOptions = Object.keys(options);

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    toast.success("Item added to cart");
    let food = data.find((item) => item.id === foodItem._id);
    let finalPrice = qty * parseInt(options[size]);

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.ImgSrc,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div className="card-container">
      <img
        src={foodItem.img || props.ImgSrc}
        className="card-img"
        alt={foodItem.name || props.foodName}
      />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name || props.foodName}</h5>
        <div className="card-details">
          <select className="custom-select" onChange={handleQty}>
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="custom-select" ref={priceRef} onChange={handleOptions}>
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="price">₹{finalPrice}/-</div>
        </div>
        <button className="add-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
