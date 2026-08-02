import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      
      if (!success || !orderId) {
        navigate("/");
        return;
      }

      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId }
      );

      if (response.data.success) {
        console.log("Payment Verified ✅");
        navigate("/");
      } else {
        console.log("Payment Failed ❌");
        navigate("/cart");
      }

    } catch (error) {
      console.log("Verify Error:", error);
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;