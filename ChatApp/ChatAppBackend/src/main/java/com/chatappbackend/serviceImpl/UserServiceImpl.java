package com.chatappbackend.serviceImpl;

import com.chatappbackend.entities.User;
import com.chatappbackend.repository.UserRepository;
import com.chatappbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {

        User newUser = userRepository.save(user);
        return newUser;
    }

    @Override
    public Optional<User> findByPhoneNumber(String phoneNumber) {

        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);
        if (user.isPresent()) {
            return user;
        }
        return Optional.empty();
    }

}
