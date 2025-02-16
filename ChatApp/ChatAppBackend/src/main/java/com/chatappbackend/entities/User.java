package com.chatappbackend.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.messaging.handler.annotation.SendTo;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "user")
@Getter
@Setter
@AllArgsConstructor
public class User {

    @Id
    private String id;
    private String name;
    private String phoneNumber;  // Unique identifier
    private String password;
    private String role;
//    private String profilePicture;
    private String about = "Hey there! I am using ChatApp";  // Additional user info
    private boolean isOnline;
    private LocalDateTime lastSeen;
    private List<String> chatIds;
//    private List<Contact> contacts;


    public User() {
    }

    public User( List<String> chatIds, LocalDateTime lastSeen, boolean isOnline, String about, String password,String role, String phoneNumber, String name) {
        this.chatIds = chatIds;
        this.lastSeen = lastSeen;
        this.isOnline = isOnline;
        this.about = about;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public boolean isOnline() {
        return isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public LocalDateTime getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(LocalDateTime lastSeen) {
        this.lastSeen = lastSeen;
    }

    public List<String> getChatIds() {
        return chatIds;
    }

    public void setChatIds(List<String> chatIds) {
        this.chatIds = chatIds;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                ", about='" + about + '\'' +
                ", isOnline=" + isOnline +
                ", lastSeen=" + lastSeen +
                ", chatIds=" + chatIds +
                '}';
    }
}
