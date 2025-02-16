package com.chatappbackend.repository;

import com.chatappbackend.entities.Chat;
import com.chatappbackend.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, String> {

}
