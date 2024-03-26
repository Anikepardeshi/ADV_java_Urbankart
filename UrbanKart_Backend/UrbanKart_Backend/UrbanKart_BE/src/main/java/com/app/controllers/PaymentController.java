package com.app.controllers;

import java.security.SignatureException;
//import java.security.Signature;
import java.time.LocalDateTime;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Payment;
import com.app.jwt_utils.Signature;
import com.app.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

//import io.jsonwebtoken.security.SignatureException;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class PaymentController {

    private static final String RAZORPAY_KEY = "rzp_live_TLff3nFLjvP9OE";
    private static final String RAZORPAY_SECRET = "Xo5x916Ll67sCSoWN3fYpiBs";


    @Autowired
    PaymentRepository paymentRepository;

    @GetMapping("/payments")
    public java.util.List<Payment> getPayments(){
        return paymentRepository.findAll();
    }

    @PostMapping("/create_order")
    public String createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
        int amount = Integer.parseInt(data.get("amount").toString());
        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY, RAZORPAY_SECRET);

        JSONObject ob = new JSONObject();
        ob.put("amount", amount*100);
        ob.put("currency", "INR");
        ob.put("receipt", "rec_1234");

        Order order = razorpayClient.orders.create(ob);
        System.out.println(order);
        return order.toString();
    }

    @PostMapping("/payment")
    public ResponseEntity<?> createPayment(@RequestBody Payment payment) throws SignatureException {
        String generatedSignature = Signature.calculateRFC2104HMAC(payment.getRazorpayOrderId() + "|" +payment.getRazorpayPaymentId(), "iYHfHn2hAVANk25M7m3OFJG5");
        if(payment.getRazorpaySignature().equals(generatedSignature)) {
            payment.setPaymentDateTime(LocalDateTime.now());
            return ResponseEntity.ok(paymentRepository.save(payment));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Transaction, Signature not verified");
    }

}
