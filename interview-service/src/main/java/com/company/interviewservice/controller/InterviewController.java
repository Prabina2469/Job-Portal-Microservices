package com.company.interviewservice.controller;
import com.company.interviewservice.entity.Interview;
import com.company.interviewservice.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/interviews")
public class InterviewController {

    @Autowired private InterviewService interviewService;


    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping
    public Interview scheduleInterview(@RequestBody Interview interview) {
        return interviewService.scheduleInterview(interview);
    }


    @PreAuthorize("hasAnyRole('RECRUITER','ADMIN')")
    @GetMapping
    public List<Interview> getInterviews() {
        return interviewService.getAllInterviews();
    }
    @PreAuthorize("hasRole('CANDIDATE')")
    @GetMapping("/my")
    public List<Interview> getMyInterviews() {
        String username = SecurityContextHolder
                .getContext().getAuthentication().getName();
        return interviewService.getInterviewsByUsername(username);
    }
}
