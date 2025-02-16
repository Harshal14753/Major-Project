package com.chatappbackend.entities;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class Message {

    @Id
    private Long id;
    private String senderId;
    private String content;
    private String chatId;
    private LocalDateTime timestamp;
    private boolean isRead;
//    private MessageType messageType;


    public Message() {
    }

    public Message(Long id, String content, String senderId, String chatId, LocalDateTime timestamp, boolean isRead) {
        this.id = id;
        this.content = content;
        this.senderId = senderId;
        this.chatId = chatId;
        this.timestamp = timestamp;
        this.isRead = isRead;
    }

    public Long getId() {
        return id;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public void setId(Long id) {
        this.id = id;
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
