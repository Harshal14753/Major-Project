package com.notes.config;

import java.io.IOException;

import com.notes.entity.User;
import com.notes.repository.UserRepo;
import com.notes.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler  {


	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserRepo userRepo;

	public CustomOAuth2SuccessHandler(JwtService jwtService, UserRepo userRepo) {
		this.jwtService = jwtService;
		this.userRepo = userRepo;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
										Authentication authentication) throws IOException {

		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
		OAuth2User user = oauthToken.getPrincipal();
		String email = user.getAttribute("email");
		System.out.println(email);

		// Set role as USER by default
		User existingUser = userRepo.findByEmail(email);

		if (existingUser == null) {
			existingUser = new User();
			existingUser.setEmail(email);
			existingUser.setRole("ROLE_USER");
			userRepo.save(existingUser);
		}

		String token = jwtService.generateToken(existingUser); // Include role + email in token

		String redirectUrl = "http://localhost:5173/oauth2/redirect?token=" + token;
		response.sendRedirect(redirectUrl);
	}
}
