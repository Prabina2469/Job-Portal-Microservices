package com.company.authservice.kafka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaProducer {


    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;


    public void sendUserRegistrationEvent(String username, String role) {
        try {
            String message = username + ":" + role;
            kafkaTemplate.send("user-registered", message);
            System.out.println("✅ Registration event: " + message);
        } catch (Exception e) {
            System.out.println("⚠️ Kafka skipped (registration): " + e.getMessage());
        }
    }

    public void sendLoginEvent(String username) {
        try {
            kafkaTemplate.send("user-logged-in", username);
            System.out.println("✅ Login event: " + username);
        } catch (Exception e) {
            System.out.println("⚠️ Kafka skipped (login): " + e.getMessage());
        }
    }


    public void sendJobAppliedEvent(String username) {
        try {
            kafkaTemplate.send("job-applied", username);
            System.out.println("✅ Job applied event: " + username);
        } catch (Exception e) {
            System.out.println("⚠️ Kafka skipped (job-applied): " + e.getMessage());
        }
    }
}

