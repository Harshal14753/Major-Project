package com.personaltalk.repositories;

import com.personaltalk.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room, String> {

    // get Room by RoomId
    public Room findByRoomId(String roomId);

}
