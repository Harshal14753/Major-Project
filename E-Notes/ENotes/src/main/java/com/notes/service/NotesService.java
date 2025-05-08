package com.notes.service;

import java.util.List;

import com.notes.entity.Notes;
import com.notes.entity.User;

public interface NotesService {
	
	
	public Notes saveNotes(Notes notes);
	
	public Notes getNotesById(int id);
	
	public Notes updateNotes(Notes notes);
	
	public boolean deleteNotes(int id);
	
	public List<Notes> getNotesByUser(User user);
}
