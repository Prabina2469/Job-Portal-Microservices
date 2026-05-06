package com.company.authservice.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;


    // ✅ Send OTP email directly
    public void sendOtpEmail(String email, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("JobPortal — OTP Verification Code");
            message.setText(
                    "Hello!\n\n" +
                            "Your OTP verification code is: " + otp + "\n\n" +
                            "This code expires in 5 minutes.\n\n" +
                            "Do not share this with anyone.\n\n" +
                            "JobPortal Team"
            );
            mailSender.send(message);
            System.out.println("OTP email sent to: " + email);
        } catch (Exception e) {
            System.out.println("Email failed: " + e.getMessage());
        }
    }


    // ✅ Send welcome email after registration
    public void sendWelcomeEmail(String email, String username) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Welcome to JobPortal!");
            message.setText(
                    "Hello " + username + "!\n\n" +
                            "Your account has been created successfully.\n\n" +
                            "You can now login and start using JobPortal.\n\n" +
                            "JobPortal Team"
            );
            mailSender.send(message);
            System.out.println("Welcome email sent to: " + email);
        } catch (Exception e) {
            System.out.println("Email failed: " + e.getMessage());
        }
    }
}
