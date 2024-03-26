import React, { useEffect, useState } from "react";
import UserOrderService from '../services/userorder.service';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { toast } from 'react-toastify';
import './table.css';
import store from "../redux/store";

const MyOrders = () => {
  const currentUser = store.getState().user;
  const [model, setModel] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const BASE_URL = "http://localhost:8080/products/";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    UserOrderService.getMyOrders(currentUser.id)
      .then((resp) => {
        setOrders(resp.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setModel(true);
  };

  const handleStatusUpdateSubmit = (e) => {
    e.preventDefault();
    UserOrderService.cancelMyOrder(selectedOrderId)
      .then(() => {
        toast.success("Order Cancelled", { autoClose: 1500 });
        setModel(false);
        fetchOrders();
      })
      .catch((error) => {
        setModel(false);
        toast.error(error.response.data, { autoClose: 1500 });
      });
  };

  return (
    <>
      <div className="form-control">
        <div>
          <Modal
            size="lg"
            isOpen={model}
            toggle={() => setModel(!model)}
            style={{ backgroundColor: "green" }}
          >
            <ModalHeader toggle={() => setModel(!model)}>
              Cancel Order
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleStatusUpdateSubmit}>
                <div className="form my-3">
                  <label htmlFor="orderId">Please confirm the Transaction ID</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    className="form-control"
                    placeholder="Enter Transaction ID to be Updated"
                    value={selectedOrderId}
                    disabled
                  />
                </div>

                <div className="text-center">
                  <button className="my-2 mx-auto btn btn-dark" type="submit">
                    Cancel Order
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
            <th scope="col">Transaction ID</th>
            <th scope="col">Order ID</th>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Total Price</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Status</th>
            <th scope="col">Delivered</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            order.orderDetails.map((oDetails, index) => (
              <tr key={index}>
                <td>{oDetails.id}</td>
                <td>{order.id}</td>
                <td>
                  <img
                    src={`${BASE_URL}${oDetails.productId.id}/image`}
                    width={100}
                    height={75}
                    alt={oDetails.productId.name}
                  />
                </td>
                <td>{oDetails.productId.name}</td>
                <td>{oDetails.totalPrice}</td>
                <td>{order.userOrdered.mobileNumber}</td>
                <td>{order.status}</td>
                <td>{order.deliveryDate}</td>
                <td>
                  {order.status !== 'DELIVERED' && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleCancelOrder(oDetails.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </>

    
  );
};

export default MyOrders;
