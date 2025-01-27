// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardFooter,
//   MDBCardHeader,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBTypography,
//   MDBBtn,
// } from "mdb-react-ui-kit";
// import Navbar from "../components/Navbar";
// import NoOrderMessage from "../components/Noordermessage";

// export default function MyOrder() {
//   const [orderData, setOrderData] = useState([]);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("userName");
//     setUserName(storedName);

//     const fetchMyOrder = async () => {
//       try {
//         const response = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/orders/details", {
//           email: localStorage.getItem("userEmail"),
//         });

//         console.log("API Response:", response.data);
//         const orderData = response.data?.data?.order_data || [];
//         const updatedOrderData = orderData.map(order => ({ order, paymentDone: false })); // Initialize paymentDone for each order
//         setOrderData(updatedOrderData);
//       } catch (error) {
//         console.error("Error fetching orders:", error.message);
//         setOrderData([]);
//       }
//     };

//     fetchMyOrder();
//   }, []);

//   return (
//     <div className="h-100 h-custom" style={{ filter: "brightness(100%)" }}>
//       <Navbar />

//       <div className="text-center fs-1 mt-4 mb-0" style={{ color: "#161A1F", fontWeight: "bold" }}>
//         My Orders
//       </div>

//       <MDBContainer className="py-4">
//         {orderData.length > 0 ? (
//           orderData.map((orderDataItem, index) => (
//             <OrderCard
//               key={index}
//               order={orderDataItem.order}
//               userName={userName}
//               paymentDone={orderDataItem.paymentDone}
//               onPaymentSuccess={() => {
//                 const updatedOrders = [...orderData];
//                 updatedOrders[index].paymentDone = true;
//                 setOrderData(updatedOrders);
//               }}
//             />
//           ))
//         ) : (
//           <NoOrderMessage />
//         )}
//       </MDBContainer>
//     </div>
//   );
// }

// const OrderCard = ({ order, userName, paymentDone, onPaymentSuccess }) => {
//   const orderDate = order[0]?.Order_date || "N/A";
//   const items = order.slice(1); // Exclude the first object (order date)
//   const totalPaid = items.reduce((total, item) => total + item.price, 0);

//   const handleConfirmPayment = async () => {
//     try {
//       const email = localStorage.getItem("userEmail");
//       const response = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/conformpayment", {
//         email,
//         paidAmount: totalPaid,
//       });

//       if (response.data.success) {
//         onPaymentSuccess();
//         alert("Payment confirmed successfully!");
//       } else {
//         alert("Failed to confirm payment: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Error confirming payment:", error.message);
//       alert("Error confirming payment. Please try again.");
//     }
//   };

//   return (
//     <MDBCard className="mb-4">
//       <MDBCardHeader className="px-4 py-3" style={{ backgroundColor: "#f8f9fa" }}>
//         <MDBTypography tag="h5" className="text-muted mb-0">
//           Thanks for your Order, <span style={{ color: "#a8729a" }}>{userName}</span>!
//         </MDBTypography>
//         <MDBTypography tag="h6" className="text-muted mb-0">
//           Order Date: {orderDate}
//         </MDBTypography>
//       </MDBCardHeader>

//       <MDBCardBody className="p-4">
//         {items.map((item, idx) => (
//           <OrderItem key={idx} item={item} />
//         ))}
//       </MDBCardBody>

//       <MDBCardFooter className="px-4 py-3 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: "#a8729a" }}>
//         <MDBTypography tag="h5" className="text-uppercase mb-0">
//           Total Paid: ₹{totalPaid}
//         </MDBTypography>
//         <MDBBtn
//           color={paymentDone ? "secondary" : "success"}
//           size="sm"
//           onClick={handleConfirmPayment}
//           disabled={paymentDone}
//         >
//           {paymentDone ? "Payment Done" : "Confirm Payment"}
//         </MDBBtn>
//       </MDBCardFooter>
//     </MDBCard>
//   );
// };

// const OrderItem = ({ item }) => (
//   <MDBRow className="border-bottom py-2">
//     <MDBCol md="6" className="d-flex align-items-center">
//       <img
//         src={item.img}
//         alt={item.name}
//         className="img-fluid rounded"
//         style={{ height: "60px", width: "60px", marginRight: "15px" }}
//       />
//       <p className="mb-0">{item.name}</p>
//     </MDBCol>
//     <MDBCol md="2" className="text-center">
//       <p className="mb-0">{item.size}</p>
//     </MDBCol>
//     <MDBCol md="2" className="text-center">
//       <p className="mb-0">{item.qty}</p>
//     </MDBCol>
//     <MDBCol md="2" className="text-center">
//       <p className="mb-0">₹{item.price}</p>
//     </MDBCol>
//   </MDBRow>
// );


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import Navbar from "../components/Navbar";
import NoOrderMessage from "../components/Noordermessage";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName);

    const fetchMyOrder = async () => {
      try {
        const response = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/orders/details", {
          email: localStorage.getItem("userEmail"),
        });

        const orderData = response.data?.data?.order_data || [];
        const updatedOrderData = orderData.map((order) => ({
          order,
          paymentDone: false,
        })); // Initialize paymentDone for each order
        setOrderData(updatedOrderData);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setOrderData([]);
      }
    };

    fetchMyOrder();
  }, []);

  const handleRemoveOrder = (index) => {
    const updatedOrders = [...orderData];
    updatedOrders.splice(index, 1); // Remove the specific order
    setOrderData(updatedOrders);
  };

  return (
    <div className="h-100 h-custom" style={{ filter: "brightness(100%)" }}>
      <Navbar />

      <div className="text-center fs-1 mt-4 mb-0" style={{ color: "#161A1F", fontWeight: "bold" }}>
        My Orders
      </div>

      <MDBContainer className="py-4">
        {orderData.length > 0 ? (
          orderData.map((orderDataItem, index) => (
            <OrderCard
              key={index}
              order={orderDataItem.order}
              userName={userName}
              paymentDone={orderDataItem.paymentDone}
              onPaymentSuccess={() => {
                const updatedOrders = [...orderData];
                updatedOrders[index].paymentDone = true;
                setOrderData(updatedOrders);
              }}
              onRemoveOrder={() => handleRemoveOrder(index)}
            />
          ))
        ) : (
          <NoOrderMessage />
        )}
      </MDBContainer>
    </div>
  );
}

const OrderCard = ({ order, userName, paymentDone, onPaymentSuccess, onRemoveOrder }) => {
  const orderDate = order[0]?.Order_date || "N/A";
  const items = order.slice(1); // Exclude the first object (order date)
  const totalPaid = items.reduce((total, item) => total + item.price, 0);

  const handleConfirmPayment = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/conformpayment", {
        email,
        paidAmount: totalPaid,
      });

      if (response.data.success) {
        onPaymentSuccess();
        alert("Payment confirmed successfully!");
      } else {
        alert("Failed to confirm payment: " + response.data.message);
      }
    } catch (error) {
      console.error("Error confirming payment:", error.message);
      alert("Error confirming payment. Please try again.");
    }
  };

  const handleRemoveOrder = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("https://snacks-sprint-shop.onrender.com/api/user/removeorder", {
        email,
      });

      if (response.data.success) {
        onRemoveOrder(); // Call the function to update the UI
        alert("Order removed successfully!");
      } else {
        alert("Failed to remove order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error removing order:", error.message);
      alert("Error removing order. Please try again.");
    }
  };

  return (
    <MDBCard className="mb-4">
      <MDBCardHeader className="px-4 py-3" style={{ backgroundColor: "#f8f9fa" }}>
        <MDBTypography tag="h5" className="text-muted mb-0">
          Thanks for your Order, <span style={{ color: "#a8729a" }}>{userName}</span>!
        </MDBTypography>
        <MDBTypography tag="h6" className="text-muted mb-0">
          Order Date: {orderDate}
        </MDBTypography>
      </MDBCardHeader>

      <MDBCardBody className="p-4">
        {items.map((item, idx) => (
          <OrderItem key={idx} item={item} />
        ))}
      </MDBCardBody>

      <MDBCardFooter className="px-4 py-3 text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: "#a8729a" }}>
        <MDBTypography tag="h5" className="text-uppercase mb-0">
          Total Paid: ₹{totalPaid}
        </MDBTypography>
        <div>
          <MDBBtn
            color={paymentDone ? "secondary" : "success"}
            size="sm"
            onClick={handleConfirmPayment}
            disabled={paymentDone}
          >
            {paymentDone ? "Payment Done" : "Confirm Payment"}
          </MDBBtn>
          <MDBBtn
            color="danger"
            size="sm"
            className="ms-2"
            onClick={handleRemoveOrder}
          >
            Remove Order
          </MDBBtn>
        </div>
      </MDBCardFooter>
    </MDBCard>
  );
};

const OrderItem = ({ item }) => (
  <MDBRow className="border-bottom py-2">
    <MDBCol md="6" className="d-flex align-items-center">
      <img
        src={item.img}
        alt={item.name}
        className="img-fluid rounded"
        style={{ height: "60px", width: "60px", marginRight: "15px" }}
      />
      <p className="mb-0">{item.name}</p>
    </MDBCol>
    <MDBCol md="2" className="text-center">
      <p className="mb-0">{item.size}</p>
    </MDBCol>
    <MDBCol md="2" className="text-center">
      <p className="mb-0">{item.qty}</p>
    </MDBCol>
    <MDBCol md="2" className="text-center">
      <p className="mb-0">₹{item.price}</p>
    </MDBCol>
  </MDBRow>
);
