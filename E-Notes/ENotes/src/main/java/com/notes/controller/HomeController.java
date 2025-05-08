package com.notes.controller;

import com.notes.dto.LoginRequest;
import com.notes.dto.LoginResponse;
import com.notes.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.notes.entity.User;
import com.notes.repository.UserRepo;
import com.notes.service.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")// Ensures all endpoints are under `/api`
@CrossOrigin("http://localhost:5173")
public class HomeController {

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private UserRepo userRepo;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserServiceImpl userServiceImpl;

	@PostMapping("/auth/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
		String token = userService.login(loginRequest);

		LoginResponse response = new LoginResponse(token, loginRequest.getEmail(), "NULL");
		return ResponseEntity.ok(response);
	}

	@PostMapping("/auth/logout")
	public ResponseEntity<String> logout() {
		return ResponseEntity.ok("Logout Successful");
	}

	@PostMapping("/saveUser")
	public ResponseEntity<Map<String, String>> saveUser(@RequestBody Map<String, String> requestBody) {

		Map<String, String> response = new HashMap<>();
		System.out.println("3");

		User user = new User();
		user.setFullname((String) requestBody.get("fullname"));
		user.setAddress((String) requestBody.get("address"));
		user.setMobileNo((String) requestBody.get("mobileNo"));
		user.setEmail((String) requestBody.get("email"));
		user.setPassword((String) requestBody.get("password"));

		String confirmPassword = (String) requestBody.get("confirmPassword");

		if (confirmPassword.equals(user.getPassword())) {
			User newUser = userService.saveUser(user);
			System.out.println("4");

			if (newUser != null) {
				response.put("status", "success");
				response.put("message", "User registered successfully");
				System.out.println("4");
				return ResponseEntity.ok(response);
			} else {
				response.put("status", "error");
				response.put("message", "User registration faled");
				System.out.println("5");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			}
		}
		response.put("status", "error");
		response.put("message", "Password and Confirm Password do not match");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}

	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
		// Extract token from Authorization header
		String jwtToken = token.replace("Bearer ", "");
		String email = jwtService.extractEmail(jwtToken);

		// Fetch user data from the database using the email
		User user = userServiceImpl.getUserByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		return ResponseEntity.ok(user);
	}

	@GetMapping("/getUser/{email}")
	public ResponseEntity<User> getUserData(@PathVariable String email){
		try {
			User user = userRepo.findByEmail(email);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

}
