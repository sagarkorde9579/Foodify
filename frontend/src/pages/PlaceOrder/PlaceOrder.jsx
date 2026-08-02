import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import axios from "axios"
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first");
      return;
    }

    if (getTotalCartAmount() === 0) {
      alert("Cart is empty");
      return;
    }

    let orderItems = [];


    food_list?.forEach((item) => {
  const qty = cartItems?.[item._id] || cartItems?.[item.id];

  if (qty > 0) {
    orderItems.push({
      ...item,
      quantity: qty
    });
  }
});

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        alert("Order failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

 
  useEffect(() => {
    if (!token) {
      console.log("User not logged in");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input name='firstName' required onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
          <input name='lastName' required onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
        </div>

        <input name='email' required onChange={onChangeHandler} value={data.email} placeholder='Email' />
        <input name='street' required onChange={onChangeHandler} value={data.street} placeholder='Street' />

        <div className="multi-fields">
          <input name='city' required onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input name='state' required onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>

        <div className="multi-fields">
          <input name='zipcode' required onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
          <input name='country' required onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>

        <input name='phone' required onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <p>Subtotal: {getTotalCartAmount()}</p>
          <p>Delivery Fee: {getTotalCartAmount() === 0 ? 0 : 2}</p>
          <b>Total: {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>

          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;