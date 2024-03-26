import React from "react";
import { Footer } from "../components";
import {toast} from 'react-toastify';
import {  useNavigate } from "react-router-dom";
import contact from "../images/contact.svg";

const ContactPage = () => {
  const navigate = useNavigate();
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    toast.success("You will hear back from us soon");
    navigate("/product");
  };

  return (
    <>
      <section className="section-contact">
        <div className="headingContainer">
          <p className="main-heading">CONTACT US</p>
          <h1>We Are Here For You</h1>
        </div>
        <div className="main-contact">
          <div>
            <img src={contact} alt="We are always ready to help" width="500px" />
          </div>
          <div>
            <div className="headingContainer">
              <p className="main-heading">CONTACT US</p>
              <h1>Get In Touch</h1>
              <p>We'd love to hear from you. Take five minutes to fill out our form so that we can get to know you.</p>
            </div>
          </div>
        </div>
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-6 mx-auto bg-dark p-5 contactDiv" >
              <h1 className="text-center mb-4 text-light">Contact Us</h1>
              <hr className="my-4" />
              <form className="my-5" onSubmit={handleSubmit}>
                <div className="form-group my-3 ">
                  <label htmlFor="Name" className="text-light">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="Email" className="text-light">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="Password" className="text-light">Message</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    id="Password"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    className="my-2 px-4 mx-auto btn btn-primary"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <ol>
          <li>
            <strong>What countries do you ship to?</strong>
            <p>We currently ship to the United States, Canada, and select countries in Europe. Please contact us for more information regarding international shipping.</p>
          </li>
          <li>
            <strong>What is your return/exchange policy?</strong>
            <p>We accept returns and exchanges within 30 days of purchase. Items must be unused and in the same condition as received. Please refer to our Returns & Exchanges page for more details.</p>
          </li>
          <li>
            <strong>How long will it take to get my order?</strong>
            <p>Orders typically ship within 1-2 business days. Delivery times vary depending on the shipping method selected at checkout.</p>
          </li>
          <li>
            <strong>What payment methods do you accept?</strong>
            <p>We accept Visa, Mastercard, American Express, and PayPal.</p>
          </li>
          <li>
            <strong>Do you have gift packaging options?</strong>
            <p>Yes, we offer gift packaging for an additional fee. You can select this option during checkout.</p>
          </li>
          <li>
            <strong>How long does order processing take?</strong>
            <p>Order processing typically takes 1-2 business days. During peak seasons, processing times may be slightly longer.</p>
          </li>
          <li>
            <strong>How do I cancel/modify an order?</strong>
            <p>To cancel or modify an order, please contact our customer support team with your order number as soon as possible.</p>
          </li>
          <li>
            <strong>How can I track my order?</strong>
            <p>Once your order has shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status of your delivery.</p>
          </li>
          <li>
            <strong>What if my order arrives damaged?</strong>
            <p>If your order arrives damaged, please contact us immediately with photos of the damaged items. We will arrange for a replacement or refund.</p>
          </li>
          <li>
            <strong>Product info Q&A</strong>
            <p>For specific product-related questions, please refer to the product page or contact our customer support team for assistance.</p>
          </li>
        </ol>
      </div>

      <Footer />
    </>
  );
}; 

export default ContactPage;
