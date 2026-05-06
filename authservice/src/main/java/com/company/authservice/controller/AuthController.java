package com.company.authservice.controller;

import com.company.authservice.dto.AuthRequest;
import com.company.authservice.entity.Role;
import com.company.authservice.entity.User;
import com.company.authservice.kafka.KafkaProducer;
import com.company.authservice.repository.UserRepo;
import com.company.authservice.security.JwtUtil;
import com.company.authservice.service.EmailService;
import com.company.authservice.service.OtpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private KafkaProducer kafkaProducer;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    // ✅ STEP 1: Validate Registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {

        if (request.getUsername() == null ||
                request.getEmail() == null ||
                request.getPassword() == null ||
                request.getRole() == null) {

            return ResponseEntity.badRequest()
                    .body("All fields including role are required");
        }

        if (userRepo.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.badRequest()
                    .body("Username already exists!");
        }

        if (userRepo.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest()
                    .body("Email already registered!");
        }

        return ResponseEntity.ok(Map.of(
                "message", "Validation successful"
        ));
    }

    // ✅ STEP 2: Send OTP
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> body) {

        String email = body.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Email is required");
        }

        otpService.generateAndSendOtp(email);

        return ResponseEntity.ok(Map.of(
                "message", "OTP sent to " + email
        ));
    }

    // ✅ STEP 3: Verify OTP + Create User
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody AuthRequest request) {

        boolean valid = otpService.verifyOtp(
                request.getEmail(),
                request.getOtp()
        );

        if (!valid) {
            return ResponseEntity.badRequest()
                    .body("Invalid or expired OTP");
        }

        // 🔥 ROLE MUST BE PRESENT
        if (request.getRole() == null) {
            return ResponseEntity.badRequest()
                    .body("Role is required (CANDIDATE or RECRUITER)");
        }

        // 🔥 CREATE USER
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setVerified(true);

        // 🔥 SET ROLE (CORRECT WAY)
        try {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Invalid role. Use CANDIDATE or RECRUITER");
        }

        userRepo.save(user);

        emailService.sendWelcomeEmail(
                user.getEmail(),
                user.getUsername()
        );

        kafkaProducer.sendUserRegistrationEvent(
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.ok(Map.of(
                "message", "Registration successful! Please login."
        ));
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        User user = userRepo.findByUsername(request.getUsername());

        if (user == null ||
                !user.getPassword().equals(request.getPassword())) {

            return ResponseEntity.status(401)
                    .body("Invalid credentials");
        }

        if (!user.isVerified()) {
            return ResponseEntity.status(403)
                    .body("Please verify your email first");
        }

        String token = jwtUtil.generateToken(
                user.getUsername(),
                user.getRole().name()
        );

        kafkaProducer.sendLoginEvent(user.getUsername());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole().name(),
                "username", user.getUsername()
        ));
    }
}