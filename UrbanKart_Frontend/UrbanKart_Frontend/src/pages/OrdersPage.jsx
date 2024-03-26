import React, { useEffect, useState } from "react";
import AdminOrderService from '../services/adminorder.service';

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Orderstatus from "../models/orderStatus";
import { toast } from 'react-toastify';

const OrdersPage = () => {

  const [model, setModel] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderStat, setOrderStat] = useState(new Orderstatus('', ''));

  const BASE_URL = "http://localhost:8080/products/";

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    AdminOrderService.getAllOrders()
      .then((resp) => {
        setOrders(resp.data);
      })
      .catch((error) => {
        console.error("Error loading orders:", error);
      });
  }

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setOrderStat(prevStat => ({
      ...prevStat,
      [name]: value
    }));
  }

  const handleStatusUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("In submit ");
    AdminOrderService.updateOrderStatus(orderStat)
      .then((resp) => {
        toast.success("Status Updated", { autoClose: 1500 });
        setModel(false);
        loadOrders();
      })
      .catch((error) => {
        setModel(false);
        toast.error(error.response.data, { autoClose: 1500 });
      });
  }

  return (
    <>
      {/* Code For Updating The Order Status */}
      <div className="form-control">
        {/* <button className="btn btn-outline-dark m-2" onClick={() => { setModel(true) }}> Update Order Status</button>
        <small>Please copy Order Id First</small> */}

        <div>
          <Modal
            size="lg"
            isOpen={model}
            toggle={() => setModel(!model)}
            style={{ backgroundColor: "green" }}
          >
            <ModalHeader toggle={() => setModel(!model)}>
              Update Order
            </ModalHeader>
            <ModalBody>
              <form onSubmit={(e) => { handleStatusUpdateSubmit(e) }}>

                <div className="form my-3">
                  <label htmlFor="orderId">Order ID</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    className="form-control"
                    onChange={handleStatusChange}
                    placeholder="Enter Order ID To be Updated"
                  />
                </div>

                <div className="form my-3">
                  <label htmlFor="status">Order Status</label>
                  <select
                    className="form-control"
                    name="status"
                    id="status"
                    onChange={handleStatusChange}
                    required
                  >
                    <option value="">--Select Status</option>
                    <option value="IN_PROCESS">IN_PROCESS</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </div>

                <div className="form my-3">
                  <label htmlFor="deliveryDate">Order Delivery Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="deliveryDate"
                    id="deliveryDate"
                    onChange={handleStatusChange}
                    required
                  />
                </div>

                <div className="text-center">
                  <button className="my-2 mx-auto btn btn-dark" type="submit">
                    Update Status
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order Id</th>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Pin Code</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Status</th>
            <th scope="col">Order date</th>
            <th scope="col">Delivery Date</th>
            
          <th scope="col">Transaction Id</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            order.orderDetails.map((oDetails, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>
                  <img
                    src={BASE_URL + oDetails.productId.id + '/image'}
                    width={100}
                    height={75}
                    alt={oDetails.productId.name}
                  />
                </td>
                
                <td>{oDetails.productId.name}</td>
                <td>{oDetails.productId.description}</td>
                <td>{oDetails.quantity}</td>
                <td>{oDetails.totalPrice}</td>
                <td>{order.userOrdered.firstName + " " + order.userOrdered.lastName}</td>
                <td>{order.address.adressLine1 + " " + order.address.adressLine2}</td>
                <td>{order.address.city}</td>
                <td>{order.address.zipCode}</td>
                <td>{order.userOrdered.mobileNumber}</td>
                <td>{order.status}</td>
                <td>{order.orderDate}</td>
                <td>{order.deliveryDate}</td>
                <td>{oDetails.id}</td>
                <td>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => {
                      setOrderStat({
                        orderId: order.id,
                        status: order.status,
                        deliveryDate: order.deliveryDate
                      });
                      setModel(true);
                    }}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </>
  );
}

export default OrdersPage;
