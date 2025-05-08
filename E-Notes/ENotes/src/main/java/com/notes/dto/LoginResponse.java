package com.notes.dto;

public class LoginResponse {
        private String token;
        private String email;
        private String fullname;

        public LoginResponse(String token, String email, String fullname) {
            this.token = token;
            this.email = email;
            this.fullname = fullname;
        }

        // Getters and setters
        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getFullname() {
            return fullname;
        }

        public void setFullname(String fullname) {
            this.fullname = fullname;
        }

}
