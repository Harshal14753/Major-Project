package com.chatappbackend.controller;

import com.chatappbackend.entities.User;
import com.chatappbackend.repository.UserRepository;
import com.chatappbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/login")
    public String login() {
        return "login";
    }


    @PostMapping("/saveUser")
    public ResponseEntity<?> createUser(@RequestBody User user) {


            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setRole("USER");
            user.setOnline(true);
            user.setLastSeen(LocalDateTime.now());
            user.setChatIds(null);

            User newUser = userService.createUser(user);

            if (newUser != null) {
                return ResponseEntity.ok().body(newUser);
            }

            return ResponseEntity.badRequest().body("Something wents wrong");
    }

    @GetMapping("/user/{phoneNumber}")
    public ResponseEntity<?> getUser(@PathVariable String phoneNumber) {
        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users/{phoneNumber}")
    public ResponseEntity<List<User>> getAllUser(@PathVariable String phoneNumber) {
        Optional<List<User>> user = userRepository.findByPhoneNumberStartsWith(phoneNumber);
//        System.out.println(user.get());
        if (user.isPresent()) {
//            System.out.println(user.get());
            return ResponseEntity.ok().body(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
