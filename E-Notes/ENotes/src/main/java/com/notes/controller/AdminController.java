package com.notes.controller;

import com.notes.entity.User;
import com.notes.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:5173")
public class AdminController {

	 @Autowired
	 private UserRepo userRepo;

    @GetMapping("/viewUserData")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepo.findAll();
        for (User user : users) {
            System.out.println(user);
        }
        return ResponseEntity.ok(users);
    }
}
