package com.company.airesumeservice.entity;
import jakarta.persistence.*;


@Entity
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String candidateName;
    private String email;
    private String skills;         // candidate's skills
    private String jobTitle;       // job they're applying for
    private String requiredSkills; // job's required skills
    private int atsScore;          // 0-100
    private String matchedSkills;
    private String missingSkills;


    public Resume() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String n) { this.candidateName = n; }
    public String getEmail() { return email; }
    public void setEmail(String e) { this.email = e; }
    public String getSkills() { return skills; }
    public void setSkills(String s) { this.skills = s; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String j) { this.jobTitle = j; }
    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String r) { this.requiredSkills = r; }
    public int getAtsScore() { return atsScore; }
    public void setAtsScore(int a) { this.atsScore = a; }
    public String getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(String m) { this.matchedSkills = m; }
    public String getMissingSkills() { return missingSkills; }
    public void setMissingSkills(String m) { this.missingSkills = m; }
}

