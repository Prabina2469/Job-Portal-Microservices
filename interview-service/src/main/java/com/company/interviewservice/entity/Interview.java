package com.company.interviewservice.entity;
import jakarta.persistence.*;
@Entity
@Table(name = "interviews")
public class Interview {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long applicationId;
    private String username;
    private String interviewerName;
    private String interviewDate;
    private String status;
    private String feedback;


    public Interview() {}


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long a) { this.applicationId = a; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getInterviewerName() { return interviewerName; }
    public void setInterviewerName(String i) { this.interviewerName = i; }
    public String getInterviewDate() { return interviewDate; }
    public void setInterviewDate(String d) { this.interviewDate = d; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
}
