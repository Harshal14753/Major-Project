package com.chatappbackend.serviceImpl;

import com.chatappbackend.entities.Chat;
import com.chatappbackend.entities.User;
import com.chatappbackend.repository.ChatRepository;
import com.chatappbackend.repository.UserRepository;
import com.chatappbackend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Chat createChat(String user1Id, String user2Id) {
        Chat chat = new Chat(List.of(user1Id, user2Id));
        Chat savedChat = chatRepository.save(chat);

        updateUserChats(user1Id, savedChat.getId());
        updateUserChats(user2Id, savedChat.getId());

        return savedChat;
    }

    private void updateUserChats(String userId, String chatId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            List<String> chatIds = user.getChatIds();
            if (chatIds == null) {
                chatIds = new ArrayList<>();
            }
            chatIds.add(chatId);
            user.setChatIds(chatIds);
            userRepository.save(user);
        }
    }

    public List<Chat> getUserChats(String userId) {
//        return chatRepository.findAllById(userId);
        User user = userRepository.findById(userId).get();

        List<Chat> chats = new ArrayList<>();

        for (String chatId: user.getChatIds()){
            chatRepository.findById(chatId).ifPresent(chats::add);
        }

        if (chats.isEmpty()){
            return null;
        }
        return chats;
    }
}
