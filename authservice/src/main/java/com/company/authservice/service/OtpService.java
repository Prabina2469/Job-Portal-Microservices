package com.company.authservice.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Autowired
    private EmailService emailService;


    private static class OtpData {
        String otp;
        long expiryTime;
        int attempts;


        OtpData(String otp) {
            this.otp = otp;
            // ✅ 10 minutes for now
            this.expiryTime = System.currentTimeMillis() + 10 * 60 * 1000;
            this.attempts = 0;
        }
    }


    private final Map<String, OtpData> otpStore =
            new ConcurrentHashMap<>();


    private final SecureRandom random = new SecureRandom();


    public void generateAndSendOtp(String email) {
        String otp = String.valueOf(100000 + random.nextInt(900000));


        // ✅ Store with email trimmed & lowercased
        otpStore.put(email.trim().toLowerCase(), new OtpData(otp));


        System.out.println("=== OTP GENERATED ===");
        System.out.println("Email stored: '" + email.trim().toLowerCase() + "'");
        System.out.println("OTP: " + otp);
        System.out.println("Store size: " + otpStore.size());
        System.out.println("All keys: " + otpStore.keySet());


        emailService.sendOtpEmail(email, otp);
    }


    public boolean verifyOtp(String email, String otp) {


        // ✅ Normalize email
        String normalizedEmail = email.trim().toLowerCase();
        String normalizedOtp = otp.trim();


        System.out.println("=== OTP VERIFY ===");
        System.out.println("Email: '" + normalizedEmail + "'");
        System.out.println("OTP: '" + normalizedOtp + "'");
        System.out.println("Store size: " + otpStore.size());
        System.out.println("All keys: " + otpStore.keySet());


        OtpData data = otpStore.get(normalizedEmail);


        if (data == null) {
            System.out.println("❌ OTP NOT FOUND!");
            System.out.println("Store is empty or email mismatch");
            return false;
        }


        System.out.println("✅ OTP found in store: " + data.otp);


        long remaining = data.expiryTime -
                System.currentTimeMillis();
        System.out.println("Time remaining: " + remaining + "ms");


        if (remaining <= 0) {
            System.out.println("❌ OTP EXPIRED!");
            otpStore.remove(normalizedEmail);
            return false;
        }


        if (data.attempts >= 5) {
            System.out.println("❌ MAX ATTEMPTS!");
            otpStore.remove(normalizedEmail);
            return false;
        }


        data.attempts++;


        if (!data.otp.equals(normalizedOtp)) {
            System.out.println("❌ WRONG OTP!");
            System.out.println("Expected: '" + data.otp + "'");
            System.out.println("Got: '" + normalizedOtp + "'");
            return false;
        }


        otpStore.remove(normalizedEmail);
        System.out.println("✅ OTP VERIFIED!");
        return true;
    }


    public void clearOtp(String email) {
        otpStore.remove(email.trim().toLowerCase());
    }


    public boolean hasOtp(String email) {
        return otpStore.containsKey(email.trim().toLowerCase());
    }


    public String getOtpDebug(String email) {
        OtpData data = otpStore.get(email.trim().toLowerCase());
        if (data == null) return "No OTP for: " + email;
        long remaining = data.expiryTime -
                System.currentTimeMillis();
        return "OTP: " + data.otp +
                " | Remaining: " + remaining + "ms" +
                " | Attempts: " + data.attempts;

    }
}