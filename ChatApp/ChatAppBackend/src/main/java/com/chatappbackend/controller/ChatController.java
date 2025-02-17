package com.chatappbackend.controller;

import com.chatappbackend.entities.Chat;
import com.chatappbackend.entities.Message;
import com.chatappbackend.payload.MessageRequest;
import com.chatappbackend.repository.ChatRepository;
import com.chatappbackend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;
    private ChatRepository chatRepository;

    @PostMapping("/chats/create/{user1Id}/{user2Id}")
    public ResponseEntity<Chat> createChat(@PathVariable String user1Id, @PathVariable String user2Id) {
        Chat chat = chatService.createChat(user1Id, user2Id);
        return ResponseEntity.ok(chat);
    }

    @GetMapping("/chats/{userId}")
    public ResponseEntity<List<Chat>> getUserChats(@PathVariable String userId) {
        List<Chat> chats = chatService.getUserChats(userId);
        return ResponseEntity.ok(chats);
    }

    @MessageMapping("/sendMessage/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public Message sendMessage(
      @DestinationVariable String chatId,
      @RequestBody MessageRequest request
    ){

        Chat chat = chatRepository.findById(chatId).get();
        Message message = new Message();
        message.setChatId(request.getChatId());
        message.setContent(request.getContent());
        message.setSenderId(request.getSenderId());

        if (chat != null) {
            chat.getMessages().add(message);
            chatRepository.save(chat);
        } else{
            throw new RuntimeException("Chat not found");
        }
        return message;
    }
}
