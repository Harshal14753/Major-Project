package com.personaltalk.controllers;

import com.personaltalk.config.AppConstants;
import com.personaltalk.entities.Message;
import com.personaltalk.entities.Room;
import com.personaltalk.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(AppConstants.FRONT_END_BASE_URL)
public class RoomController {

    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    //    Create Room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {

        if (roomRepository.findByRoomId(roomId) != null) {
            return ResponseEntity.badRequest().body("Room already exists");
        }
        Room room = new Room();
        System.out.println(roomId);
        room.setRoomId(roomId);

        return ResponseEntity.status(HttpStatus.CREATED).body(roomRepository.save(room));
    }


//    get Room : join
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {

        Room room = roomRepository.findByRoomId(roomId);
        if (room == null ) {
            return ResponseEntity.badRequest().body("Room not found");
        }

        return ResponseEntity.ok(room);
    }


    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId,
            @RequestParam(value ="page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size
    ) {


        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.badRequest().build();
        }
//        Get Messages
        List<Message> messages = room.getMessages();

//        Pagination
        int start = Math.max(0, messages.size() - (page + 1) * size);
        int end = Math.min(messages.size(), start + size);
        List<Message> paginatedMessages = messages.subList(start, end);

        return ResponseEntity.ok(paginatedMessages);
    }
}
