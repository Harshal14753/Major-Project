package com.personaltalk.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        By using end point we have to create SockJS Client
        registry.addEndpoint("/chat")
                .setAllowedOrigins(AppConstants.FRONT_END_BASE_URL)
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
//        subscribe url start from /topic
        config.enableSimpleBroker("/topic");

        config.setApplicationDestinationPrefixes("/app");
    }
}
