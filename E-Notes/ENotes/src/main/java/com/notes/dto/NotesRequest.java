package com.notes.dto;

import org.springframework.web.multipart.MultipartFile;

public class NotesRequest {

    private String title;
    private String description;
    private MultipartFile file;

    public NotesRequest() {
    }

    public NotesRequest(String title, String description, MultipartFile file) {
        this.title = title;
        this.description = description;
        this.file = file;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
