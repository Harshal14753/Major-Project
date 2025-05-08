package com.notes.controller;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import com.notes.service.JwtService;
import com.notes.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.notes.entity.Notes;
import com.notes.entity.User;
import com.notes.repository.UserRepo;
import com.notes.service.NotesServicesImpl;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private NotesServicesImpl notesService;

	private static final String BASE_DIRECTORY = "C:/Users/Harshal PC/Desktop/.vscode/Spring Boot/Project/Major-Project/E-Notes/ENotes-Data";

	@Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private JwtService jwtService;

	@GetMapping("/viewNotes")
	public ResponseEntity<List<Notes>> viewNotes(Principal p) {
		User user = userServiceImpl.getUserByEmail(p.getName());
		List<Notes> notesList = notesService.getNotesByUser(user);
		return ResponseEntity.ok(notesList);
	}


	@GetMapping("/editNotes/{id}")
	public String editNotes(@PathVariable int id, Model m) {
		Notes notes = notesService.getNotesById(id);
		m.addAttribute("n", notes);
		return "editNotes";
	}

	@GetMapping("/note/{id}")
	public ResponseEntity<Notes> getNote(@PathVariable int id) {
		Notes notes = notesService.getNotesById(id);
		return ResponseEntity.ok(notes);
	}


	@PostMapping(value = "/file/saveNotes", consumes = {"multipart/form-data"})
	public ResponseEntity<String> saveNotes(@RequestParam("title") String title,
											@RequestParam("description") String description,
											@RequestParam("userEmail") String userEmail,
											@RequestParam(value = "file", required = false) MultipartFile file) {

		System.out.println(title);
		System.out.println(description);
		System.out.println(userEmail);
		System.out.println("4");

//		User user = getUser(p, m);
		User user = userRepo.findByEmail(userEmail);

//		File uploading
		File userFolder = new File(BASE_DIRECTORY, user.getEmail());
		if (!userFolder.exists()) {
			userFolder.mkdirs(); // Create the directory if it doesn't exist
			System.out.println("5");
		}

		if (file.isEmpty()) {
			System.out.println("6");
			return ResponseEntity.badRequest().body("Please select a file to upload");
//			session.setAttribute("msg2", "Please select a file to upload");
		}


		try {
			// Ensure directory exists
			File uploadDir = new File(BASE_DIRECTORY + "/" + user.getEmail());
			System.out.println("7");
			if (!uploadDir.exists()) {
				uploadDir.mkdirs();
				System.out.println("8");
			}

			// Save the file
			String filePath = BASE_DIRECTORY + "/" + user.getEmail() + "/" + file.getOriginalFilename();
			file.transferTo(new File(filePath));
			System.out.println("9");
		} catch (IOException e) {
			System.out.println("10");
			return ResponseEntity.badRequest().body("Something went wrong");
//			session.setAttribute("msg2", "Something went wrong");
		}

		Notes notes = new Notes();
		notes.setTitle(title);
		notes.setDescription(description);

		notes.setDate(LocalDate.now());
		notes.setUser(user);
		notes.setFileName(file.getOriginalFilename());

		Notes saveNotes = notesService.saveNotes(notes);
		if (saveNotes != null) {
//			session.setAttribute("msg1", "Notes added Succesfully");
			System.out.println("11");
			return ResponseEntity.ok("Notes added successfully");
		} else {
//			session.setAttribute("msg2", "Something error");
			System.out.println("12");
			return ResponseEntity.badRequest().body("Something went wrong");
		}
	}

	@PutMapping(value = "/file/updateNotes/{id}", consumes = {"multipart/form-data"})
	public ResponseEntity<String> updateNotes(@PathVariable("id") int id,
											  @RequestParam("title") String title,
											  @RequestParam("description") String description,
											  @RequestParam("userEmail") String userEmail,
											  @RequestParam(value = "file", required = false) MultipartFile file) {

		Notes existingNote = notesService.getNotesById(id); // Fetch the existing note
		if (existingNote == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found");
		}

		User user = userRepo.findByEmail(userEmail);
		if (user == null) {
			return ResponseEntity.badRequest().body("User not found");
		}

		File userFolder = new File(BASE_DIRECTORY, user.getEmail());
		if (!userFolder.exists()) {
			userFolder.mkdirs(); // Create the directory if it doesn't exist
		}

		// Handle file update if a new file is provided
		if (file != null && !file.isEmpty()) {
			try {
				// Save the file
				String filePath = BASE_DIRECTORY + "/" + user.getEmail() + "/" + file.getOriginalFilename();
				file.transferTo(new File(filePath));
				existingNote.setFileName(file.getOriginalFilename());
			} catch (IOException e) {
				return ResponseEntity.badRequest().body("File upload failed");
			}
		}

		// Update the note details
		existingNote.setTitle(title);
		existingNote.setDescription(description);
		existingNote.setDate(LocalDate.now());
		existingNote.setUser(user);

		Notes updatedNote = notesService.saveNotes(existingNote); // Save updated note
		if (updatedNote != null) {
			return ResponseEntity.ok("Notes updated successfully");
		} else {
			return ResponseEntity.badRequest().body("Something went wrong during update");
		}
	}

	@GetMapping("/deleteNotes/{id}")
	public ResponseEntity<String> deleteNotes(@PathVariable int id, HttpSession session) {

		boolean isDelete = notesService.deleteNotes(id);

		if (isDelete) {
			ResponseEntity.ok("Notes deleted Succesfully");
		} else {
			ResponseEntity.badRequest().body("Something went wrong");
		}
		return null;
	}
}