package com.chatappbackend.service;

import com.chatappbackend.entities.Chat;

import java.util.List;

public interface ChatService {

    public Chat createChat(String user1Id, String user2Id);

    public List<Chat> getUserChats(String userId);
}
