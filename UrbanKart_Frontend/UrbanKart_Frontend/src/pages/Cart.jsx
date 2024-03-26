import React from "react";
import store from "../redux/store";
import { useState, useEffect } from "react";
import CartService from "../services/cart.service";
import { Footer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import CartItem from "../models/item";
import axios from "axios";

let totalPriceWithShipping;

const Cart = () => {
  let totalPriceWithShipping;
  let uemail;
  let uname;

  const user = useSelector((state) => state.user);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment status
  // const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment status
  const [buttonsDisabled, setButtonsDisabled] = useState(false); // State to track button disabled status

  const [cart, setCart] = useState({});
  const currentUser = store.getState().user;
  const BASE_URL = "http://localhost:8080/products/";

  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      setButtonsDisabled(true);
      return;
    }
    // const order = await axios.post("http://localhost:8080/api/create_order", {
    //   amount: amount,
    // });

    const options = {
      key: "rzp_live_TLff3nFLjvP9OE",
      amount: totalPriceWithShipping * 100, // Razorpay amount should be in paisa
      currency: "INR",
      name: "UrbanKart",
      description: "Product Description",
      image: "https://www.example.com/your_logo.png",
      handler: (response) => {
        alert("Payment Successful");
        setPaymentSuccess(true);
        console.log(response);
      },
      prefill: {
        name: user.firstName,
        email: user.email,
        contact: user.mobileNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    CartService.getMyCart(currentUser.id).then((response) => {
      setCart(response.data);
      // console.log(response.data);
    });
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    const item1 = new CartItem(1, currentUser.id, product.productId.id);
    if (!paymentSuccess) {
    CartService.addToCart(item1).then((resp) => {
      cart.cartItems.map((item) => {
        if (item.productId.id === product.productId.id) {
          item.quantity = item.quantity + 1;
          item.totalPrice = item.totalPrice + item.productId.price;
        }
      });

      const tp = cart.totalPrice + product.productId.price;

      setCart((prevState) => {
        return {
          ...prevState,
          ["cartItems"]: cart.cartItems,
          ["totalItems"]: cart.totalItems + 1,
          ["totalPrice"]: tp,
        };
      });
    });

    dispatch(addCart(product));
  }
  };

  const removeItem = (product) => {
    if (!paymentSuccess) {
    if (product.quantity == 1) {
      CartService.deleteItem(product.id).then((resp) => {
        cart.cartItems.map((item, index) => {
          if (item.productId.id === product.productId.id) {
            cart.cartItems.splice(index, 1);
          }
        });
        // console.log(cart.cartItems);
        const tp = cart.totalPrice - product.productId.price;

        setCart((prevState) => {
          return {
            ...prevState,
            ["cartItems"]: cart.cartItems,
            ["totalItems"]: cart.totalItems - 1,
            ["totalPrice"]: tp,
          };
        });
      });

      cart.totalItems > 0 ? <ShowCart /> : <EmptyCart />;
    } else {
      CartService.decreaseItem(product.id).then((resp) => {
        cart.cartItems.map((item) => {
          if (item.productId.id === product.productId.id) {
            item.quantity = item.quantity - 1;
            item.totalPrice = item.totalPrice - item.productId.price;
          }
        });
        // console.log(cart.cartItems);
        const tp = cart.totalPrice - product.productId.price;
        setCart((prevState) => {
          return {
            ...prevState,
            ["cartItems"]: cart.cartItems,
            ["totalItems"]: cart.totalItems - 1,
            ["totalPrice"]: tp,
          };
        });
      });
    }

    dispatch(delCart(product));
  }
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 0;
    let totalItems = 0;
    totalPriceWithShipping = parseInt(cart.totalPrice) + shipping;
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-4">
                {/* here you can change the size of item list image */}
                <div className="card mb-4">
                  <div className="card-header py-3 bg-dark">
                    <h5 className="mb-0" style={{ color: "#fff" }}>
                      Item List
                    </h5>
                  </div>
                  <div className="card-body">
                    {cart.cartItems.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-2 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={`${BASE_URL}${item.productId.id}/image`}
                                  alt={item.productName}
                                  width={200}
                                  height={150}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.productName}</strong>
                              </p>
                            </div>

                            <div className="col-lg-12 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn btn-light px-3"
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.quantity}</p>

                                <button
                                  className="btn btn-light px-3"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-dark">
                    <h5 className="mb-0" style={{ color: "#fff" }}>
                      Order Summary
                    </h5>
                  </div>
                  <div className="card-body">
                    {/* Name :{user.email}

{user.firstName} */}
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Name of customer :<span>{user.firstName}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Email of customer :<span>{user.email}</span>
                      </li>

                      {/* <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Rs {shipping}</span>
                      </li> */}

                      {cart.cartItems.map((item, index) => {
                        return (
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            {index + 1}) {item.productId.name} x {item.quantity}{" "}
                            <span>Rs {item.totalPrice}</span>
                          </li>
                        );
                      })}<br/><br/><hr/>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-5">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <div>
                          <strong>
                            {/* Rs {parseInt(cart.totalPrice) + shipping} */}
                          </strong>
                          {/* {
                            (totalPriceWithShipping =
                              parseInt(cart.totalPrice) + shipping)
                          } */}
                        </div>
                        <div>
                          <strong>
                            Rs {parseInt(cart.totalPrice) + shipping}
                          </strong>
                        </div>
                      </li>
                    </ul>

                    <div
                      className="App"
                      style={{ marginTop: "5%", marginBottom: "10%" }}
                    >
                      <form onSubmit={paymentHandler}>
                        {/* Hide the span */}
                        <span style={{ display: "none" }}>
                          {totalPriceWithShipping}
                        </span>
                        <br />

                        <input
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                          value={paymentSuccess ? "paid" : "pay"}
                          onClick={paymentHandler}
                          disabled={paymentSuccess}
                        />
                      </form>
                    </div>

                    {/* {
                            (uname =
                              user.firstName)
                              (uemail =
                                user.email)
                          } */}

                    {/* <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                      myCart={cart}
                    >
                      {" "}
                      Check Out{" "}
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cart.totalItems > 0 ? <ShowCart /> : <EmptyCart />}
        {paymentSuccess ? (
          <Link
            to="/checkout"
            className="btn btn-dark btn-lg btn-block"
            myCart={cart}
          >
            {" "}
            Check Out{" "}
          </Link>
        ) : (
          <button disabled className="btn btn-dark btn-lg btn-block">
            Check Out
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
