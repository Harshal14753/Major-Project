package com.chatappbackend.repository;

import com.chatappbackend.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Long > {

    public Optional<User> findByPhoneNumber(String phoneNumber);

    public Optional<User> findById(String id);
}
