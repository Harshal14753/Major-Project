package com.chatappbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "chat")
@Getter
@Setter
@AllArgsConstructor
public class Chat {

    @Id
    private String id;
    private List<User> participants; // One-to-One or Group chat
    private List<Message> messages;
    private LocalDateTime lastMessageTime;
    private boolean isGroupChat;

//    For group chat only
    private String groupName;
    private User admin;
    private String groupIcon;
    private LocalDateTime createdAt;

    public Chat() {
    }

    public Chat(List<User> participants, List<Message> messages, LocalDateTime lastMessageTime, boolean isGroupChat) {
        this.participants = participants;
        this.messages = messages;
        this.lastMessageTime = lastMessageTime;
        this.isGroupChat = isGroupChat;
    }

    public Chat(List<User> participants, List<Message> messages, LocalDateTime lastMessageTime, boolean isGroupChat, String groupName, User admin, String groupIcon, LocalDateTime createdAt) {
        this.participants = participants;
        this.messages = messages;
        this.lastMessageTime = lastMessageTime;
        this.isGroupChat = isGroupChat;
        this.groupName = groupName;
        this.admin = admin;
        this.groupIcon = groupIcon;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public LocalDateTime getLastMessageTime() {
        return lastMessageTime;
    }

    public void setLastMessageTime(LocalDateTime lastMessageTime) {
        this.lastMessageTime = lastMessageTime;
    }

    public boolean isGroupChat() {
        return isGroupChat;
    }

    public void setGroupChat(boolean groupChat) {
        isGroupChat = groupChat;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    public String getGroupIcon() {
        return groupIcon;
    }

    public void setGroupIcon(String groupIcon) {
        this.groupIcon = groupIcon;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
