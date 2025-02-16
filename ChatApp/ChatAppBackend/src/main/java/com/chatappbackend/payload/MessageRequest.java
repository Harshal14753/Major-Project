package com.chatappbackend.payload;

public class MessageRequest {

    private String senderId;
    private String content;
    private String chatId;

    public MessageRequest() {
    }

    public MessageRequest(String senderId, String content, String chatId) {
        this.senderId = senderId;
        this.content = content;
        this.chatId = chatId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
