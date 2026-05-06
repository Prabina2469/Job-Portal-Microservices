package com.company.notification_service.kafka;

import com.company.notification_service.entity.Notification;
import com.company.notification_service.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;


@Component
public class KafkaConsumer {


    @Autowired
    private NotificationRepository notificationRepository;


    // ✅ User registered → save notification
    @KafkaListener(
            topics = "user-registered",
            groupId = "notification-group"
    )
    public void handleUserRegistered(String message) {
        System.out.println("Registration event: " + message);


        // message = "username:role"
        String[] parts = message.split(":");
        String username = parts[0];


        saveNotification(
                username,
                "REGISTERED",
                username + " has registered successfully."
        );
    }


    // ✅ User logged in → recruiter sees notification
    @KafkaListener(
            topics = "user-logged-in",
            groupId = "notification-group"
    )
    public void handleUserLoggedIn(String message) {
        System.out.println("Login event: " + message);


        saveNotification(
                message,
                "LOGGED_IN",
                message + " just logged in."
        );
    }


    // ✅ Job applied → save notification
    @KafkaListener(
            topics = "job-applied",
            groupId = "notification-group"
    )
    public void handleJobApplied(String message) {
        System.out.println("Job applied event: " + message);


        saveNotification(
                message,
                "JOB_APPLIED",
                message + " applied for a job."
        );
    }


    private void saveNotification(String username,
                                  String event,
                                  String msg) {
        Notification notification = new Notification();
        notification.setUsername(username);
        notification.setEvent(event);
        notification.setMessage(msg);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);
        System.out.println("Notification saved: " + msg);
    }
}

