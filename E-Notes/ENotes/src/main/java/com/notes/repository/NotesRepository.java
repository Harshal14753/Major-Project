package com.notes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notes.entity.Notes;
import com.notes.entity.User;

public interface NotesRepository extends JpaRepository<Notes, Integer> {

	public List<Notes> findByUser(User user);

//	List<Notes> getNotesByUser(User user);
}
