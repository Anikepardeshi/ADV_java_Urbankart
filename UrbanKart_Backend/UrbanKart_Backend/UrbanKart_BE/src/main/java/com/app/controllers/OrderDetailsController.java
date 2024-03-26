package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.services.OrderDetailsService;
import com.app.services.OrderService;


@RestController
@RequestMapping("/orderdetails")
public class OrderDetailsController {

	@Autowired
	private OrderDetailsService orderdetailsService;
	@PutMapping("cancleById/{id}") // User
	public ResponseEntity<String> deleteOrders(@PathVariable Long id) {
		
		System.out.println(id);
		System.out.println(id);
	

		orderdetailsService.deleteOrder(id);
		return new ResponseEntity<String>("Order Deleted", HttpStatus.CREATED);
	}
}
