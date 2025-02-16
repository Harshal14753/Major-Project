package com.chatappbackend.service;

import com.chatappbackend.entities.User;

import java.util.Optional;

public interface UserService {

    public User createUser(User user);

    public Optional<User> findByPhoneNumber(String phoneNumber);
}
