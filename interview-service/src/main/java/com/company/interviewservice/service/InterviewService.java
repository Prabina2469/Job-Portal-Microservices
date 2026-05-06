package com.company.interviewservice.service;

import com.company.interviewservice.entity.Interview;
import com.company.interviewservice.repository.InterviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class InterviewService {


    @Autowired private InterviewRepo interviewRepository;


    public Interview scheduleInterview(Interview interview) {
        interview.setStatus("SCHEDULED");
        return interviewRepository.save(interview);
    }


    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }


    public List<Interview> getInterviewsByUsername(String username) {
        return interviewRepository.findByUsername(username);
    }
}

