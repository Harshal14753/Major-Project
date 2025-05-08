package com.notes.service;

import com.notes.entity.User;
import com.notes.dto.LoginRequest;

public interface UserService {
	
	public User saveUser(User user);

	public String login(LoginRequest loginRequest);
	
	public void removeSessionMessage();

	public User getUserByEmail(String email);
	
}
