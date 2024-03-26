package com.app.controllers;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthRequest;
import com.app.dto.AuthResp;
import com.app.dto.UsersDTO;
import com.app.entities.Users;
import com.app.jwt_utils.JwtUtils;
import com.app.services.CustomUserDetails;
import com.app.services.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@Slf4j
public class SignInSignUpController {

	@Autowired
	private JwtUtils utils;
	

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private UserService userService;

	@Autowired
	private ModelMapper mapper;

	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthRequest request) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token " + authToken);
		Authentication authentication = manager.authenticate(authToken);
		log.info("auth token again " + authentication.getPrincipal().getClass());
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Users user = userDetails.getUser();
		AuthResp resp = mapper.map(user, AuthResp.class);
		resp.setToken(utils.generateJwtToken(authentication));
		return ResponseEntity.ok(resp);

	}

	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UsersDTO user) {
		System.out.println("in reg user : user ");

		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUserDetails(user));
	}
}
