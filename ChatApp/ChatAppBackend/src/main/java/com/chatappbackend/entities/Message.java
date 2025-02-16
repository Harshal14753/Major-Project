package com.chatappbackend.entities;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class Message {

    @Id
    private Long id;
    private User sender;
    private Chat chat;
    private String content;
    private LocalDateTime timestamp;
    private boolean isRead;
//    private MessageType messageType;


    public Message() {
    }

    public Message(User sender, Chat chat, String content, boolean isRead, LocalDateTime timestamp) {
        this.sender = sender;
        this.chat = chat;
        this.content = content;
        this.isRead = isRead;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}
