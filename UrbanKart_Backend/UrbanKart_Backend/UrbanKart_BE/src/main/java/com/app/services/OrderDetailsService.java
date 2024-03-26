package com.app.services;

import com.app.entities.OrderDetails;

public interface OrderDetailsService {

	OrderDetails saveOrderDetails(OrderDetails orderDetails);
	public void deleteOrder(Long id) ;
}
