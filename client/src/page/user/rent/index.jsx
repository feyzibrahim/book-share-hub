import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { URL } from "@common/api";
import { config } from "@common/configurations";
import AddressCheckoutSession from "../components/AddressCheckoutSession";
import Loading from "../../../components/Loading";
import { emptyRentStore } from "../../../redux/reducers/user/rentSlice";
import CheckoutPaymentOptionForRent from "../components/CheckoutPaymentOptionForRent";
import Modal from "../../../components/Modal";
import AgreementModal from "./AgreementModal";

const RentBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, numberOfDays } = useSelector((state) => state.rent);

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, []);

  let totalPrice = product ? product.price + (product.markup ?? 0) : 0;

  const finalTotal = totalPrice * numberOfDays;

  // Wallet balance
  const [walletBalance, setWalletBalance] = useState(0);

  // Address Selection
  const [selectedAddress, setSelectedAddress] = useState("");
  // Payment Selection
  const [selectedPayment, setSelectedPayment] = useState("myWallet");

  // Additional Note
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Page switching
  const [orderPlacedLoading, setOrderPlacedLoading] = useState(false);
  // const [confirmationPage, setConfirmationPage] = useState(false);
  // const [orderData, setOrderData] = useState({});

  const navigateToOrderConfirmation = (orderD) => {
    if (orderD) {
      navigate("/order-confirmation", { state: orderD });
    }
  };

  // Cash on delivery or wallet balance
  const saveOrderOnCashDeliveryOrMyWallet = async (response) => {
    setOrderPlacedLoading(true);

    try {
      const order = await axios.post(
        `${URL}/user/rent/${product._id}`,
        {
          notes: additionalNotes,
          address: selectedAddress,
          paymentMode: selectedPayment,
          numberOfDays,
          quantity: 1,
        },
        config
      );

      // Updating user side
      // setOrderData(order.data.order);
      toast.success("Order Placed");
      setOrderPlacedLoading(false);
      // setConfirmationPage(true);
      dispatch(emptyRentStore());
      navigateToOrderConfirmation(order.data.order);
    } catch (error) {
      // Error Handling
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setOrderPlacedLoading(false);
    }
  };

  // Razor Pay payment

  // Saving the order to db
  const saveOrder = async (response) => {
    setOrderPlacedLoading(true);

    try {
      // Make the first POST request to create the order
      const orderResponse = await axios.post(
        `${URL}/user/rent-book/${product._id}`,
        {
          notes: additionalNotes,
          address: selectedAddress,
          paymentMode: selectedPayment,
          numberOfDays: 1,
        },
        config
      );

      const { order } = orderResponse.data;

      // Make the second POST request to verify payment with Razorpay and save that to database
      await axios.post(
        `${URL}/user/razor-verify`,
        { ...response, order: order._id },
        config
      );

      // Updating user side
      // setOrderData(order);
      toast.success("Order Placed");
      setOrderPlacedLoading(false);
      // setConfirmationPage(true);
      dispatch(emptyBuyNowStore());
      navigateToOrderConfirmation(order);
    } catch (error) {
      // Error Handling
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setOrderPlacedLoading(false);
    }
  };

  const updateWalletBalance = async (response) => {
    try {
      await axios.post(
        `${URL}/user/razor-verify-wallet`,
        { ...response, amount: cautionDeposit },
        config
      );

      setWalletBalance(parseInt(walletBalance) + parseInt(cautionDeposit));
      toast.success("Wallet Updated");
    } catch (error) {
      // Error Handling
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  const [cautionDeposit, setCautionDeposit] = useState(500);

  // Initiating razor pay payment method or window
  const initiateRazorPayPayment = async () => {
    // Getting razor-pay secret key
    const {
      data: { key },
    } = await axios.get(`${URL}/user/razor-key`, { withCredentials: true });

    // making razor-pay order
    const {
      data: { order },
    } = await axios.post(
      `${URL}/user/razor-order`,
      { amount: parseInt(cautionDeposit * 100) },
      config
    );

    // setting razor pay configurations
    let options = {
      key: key,
      amount: parseInt(cautionDeposit * 100),
      currency: "INR",
      name: "Book Share Hub",
      description: "Test Transaction",
      image: `${URL}/off/logo.png`,
      order_id: order.id,
      handler: function (response) {
        updateWalletBalance(response);
      },
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razor pay Corporate Office",
      },
      theme: {
        color: "#2b2b30",
      },
    };

    // enabling razor-pay payment screen
    const razor = new window.Razorpay(options);

    razor.open();

    // If failed toast it.
    razor.on("payment.failed", function (response) {
      toast.error(response.error.code);
      toast.error(response.error.description);
      toast.error(response.error.source);
      toast.error(response.error.step);
      toast.error(response.error.reason);
      toast.error(response.error.metadata.order_id);
      toast.error(response.error.metadata.payment_id);
      setOrderPlacedLoading(false);
    });
  };

  // Order placing
  const showAgreementModal = async () => {
    // Validating before placing an order
    if (!selectedAddress) {
      toast.error("Delivery address not found");
      return;
    }

    if (selectedPayment === "myWallet") {
      let entireTotal = Number(totalPrice);
      if (walletBalance < entireTotal || walletBalance < 500) {
        toast.error("Insufficient balance in your wallet");
        return;
      }
    }

    toggleAgreement();
  };

  const placeOrder = () => {
    if (selectedPayment === "myWallet") {
      saveOrderOnCashDeliveryOrMyWallet();
    }
  };

  // Displaying address modal for creating address
  const [showAgreement, setShowAgreement] = useState(false);
  const toggleAgreement = () => {
    setShowAgreement(!showAgreement);
  };

  return (
    <>
      {showAgreement && (
        <Modal
          tab={
            <AgreementModal
              closeToggle={toggleAgreement}
              placeOrder={placeOrder}
            />
          }
        />
      )}
      {orderPlacedLoading ? (
        <Loading />
      ) : (
        <div className="pt-20 px-5 lg:p-20 lg:flex items-start gap-5 bg-gray-100">
          <div className="lg:w-3/4">
            <AddressCheckoutSession
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <div className="bg-white my-5 p-5 rounded">
              <h1 className="text-xl font-semibold border-b pb-2 mb-3">
                Payment Option
              </h1>
              <CheckoutPaymentOptionForRent
                walletBalance={walletBalance}
                setWalletBalance={setWalletBalance}
                cautionDeposit={cautionDeposit}
                setCautionDeposit={setCautionDeposit}
                initiateRazorPayPayment={initiateRazorPayPayment}
              />
            </div>

            <p className="my-1 font-semibold">Additional Notes</p>
            <textarea
              placeholder="Notes about your order e.g. special notes for delivery"
              className="w-full h-40 px-3 py-2 outline-none rounded resize-none"
              value={additionalNotes}
              onChange={(e) => {
                setAdditionalNotes(e.target.value);
              }}
            ></textarea>
          </div>

          {/* Order Summery Session */}

          <div className="lg:w-1/4 bg-white px-5 py-3 border border-gray-200 rounded shrink-0">
            <h1 className="font-semibold py-2">Order Summery</h1>
            <div className="py-1">
              {product && (
                <div className="flex gap-2 items-center mb-3">
                  <div className="w-9 h-9 shrink-0">
                    <img
                      src={`${URL}/img/${product.imageURL}`}
                      alt="im"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold text-blue-500">
                        {product.markup
                          ? product.price + product.markup
                          : product.price}
                        ₹
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <>
              <div className="border-b border-gray-200 pb-2 mb-2">
                <div className="cart-total-li">
                  <p className="cart-total-li-first">Number of days:</p>
                  <p className="cart-total-li-second">{numberOfDays}</p>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-2 mb-2">
                <div className="cart-total-li">
                  <p className="cart-total-li-first">Sub Total</p>
                  <p className="cart-total-li-second">
                    {totalPrice * numberOfDays}₹
                  </p>
                </div>
              </div>
              <div className="cart-total-li">
                <p className="font-semibold text-gray-500">Total</p>
                <p className="font-semibold">{finalTotal}₹</p>
              </div>
            </>
            <button
              className="btn-blue w-full text-white uppercase font-semibold text-sm my-5"
              onClick={showAgreementModal}
            >
              Place order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RentBook;
