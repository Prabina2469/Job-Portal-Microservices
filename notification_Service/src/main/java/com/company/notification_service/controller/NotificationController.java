package com.company.notification_service.controller;

import com.company.notification_service.entity.Notification;
import com.company.notification_service.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public class NotificationController {


    @Autowired
    private NotificationRepository notificationRepository;


    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }


    @GetMapping("/{username}")
    public List<Notification> getUserNotifications(@PathVariable String username) {
        return notificationRepository.findByUsername(username);
    }

}
