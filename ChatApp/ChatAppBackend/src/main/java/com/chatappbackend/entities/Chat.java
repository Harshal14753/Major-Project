package com.chatappbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "chats")
@Getter
@Setter
@AllArgsConstructor
public class Chat {

    @Id
    private String id;
    private List<String> participantIds; // One-to-One or Group chat
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

    public Chat(List<String> participantIds, List<Message> messages, LocalDateTime lastMessageTime, boolean isGroupChat) {
        this.participantIds = participantIds;
        this.messages = messages;
        this.lastMessageTime = lastMessageTime;
        this.isGroupChat = isGroupChat;
    }

    public Chat(List<String> participantIds, List<Message> messages, LocalDateTime lastMessageTime, boolean isGroupChat, String groupName, User admin, String groupIcon, LocalDateTime createdAt) {
        this.participantIds = participantIds;
        this.messages = messages;
        this.lastMessageTime = lastMessageTime;
        this.isGroupChat = isGroupChat;
        this.groupName = groupName;
        this.admin = admin;
        this.groupIcon = groupIcon;
        this.createdAt = createdAt;
    }

    public Chat(List<String> participantIds) {
        this.participantIds = participantIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<String> participantIds) {
        this.participantIds = participantIds;
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
