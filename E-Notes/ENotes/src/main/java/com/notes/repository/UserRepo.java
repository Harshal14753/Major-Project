package com.notes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notes.entity.User;

public interface UserRepo extends JpaRepository<User, Integer>{

	public User findByEmail(String email);
}
