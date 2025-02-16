package com.chatappbackend.entities;

import org.springframework.data.annotation.Id;

public class Contact {

    @Id
    private Long id;
    private User user;   // Reference to the User entity
    private String nickname;
    private boolean isBlocked;

    public Contact() {
    }

    public Contact(User user, String nickname, boolean isBlocked) {
        this.user = user;
        this.nickname = nickname;
        this.isBlocked = isBlocked;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public boolean isBlocked() {
        return isBlocked;
    }

    public void setBlocked(boolean blocked) {
        isBlocked = blocked;
    }
}
