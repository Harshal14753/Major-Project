package com.notes.service;

import com.notes.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.notes.entity.User;
import com.notes.repository.UserRepo;

import jakarta.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

	public User saveUser(User user) {
		user.setRole("ROLE_USER");
		String password = passwordEncoder.encode(user.getPassword());
		user.setPassword(password);
		User newUser = userRepo.save(user);
		return newUser;
	}

	@Override
	public String login(LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		User user = null;
		try {
			user = userRepo.findByEmail(loginRequest.getEmail());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		if (authentication.isAuthenticated()){
//			return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
			return jwtService.generateToken(user);
		}
		return null;
	}

	@Override
	public void removeSessionMessage() {
		HttpSession session =(((ServletRequestAttributes) (RequestContextHolder.getRequestAttributes())).getRequest().getSession());
		session.removeAttribute("msg1");
		session.removeAttribute("msg2");
	}

	@Override
	public User getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}

}
