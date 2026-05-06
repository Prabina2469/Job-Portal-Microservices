package com.company.applicationservice.controller;
import com.company.applicationservice.dto.ApplicationRequest;
import com.company.applicationservice.entity.Application;
import com.company.applicationservice.entity.ApplicationStatus;
import com.company.applicationservice.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/applications")
public class ApplicationController {


    @Autowired private ApplicationService applicationService;


    @PreAuthorize("hasRole('CANDIDATE')")
    @PostMapping
    public ResponseEntity<Map<String, Object>> applyJob(
            @RequestBody ApplicationRequest request) {


        String username = SecurityContextHolder
                .getContext().getAuthentication().getName();


        applicationService.applyJob(request.getJobId(), username);


        return ResponseEntity.ok(Map.of(
                "message", "Application submitted",
                "jobId", request.getJobId(),
                "user", username
        ));
    }


    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/job/{jobId}")
    public List<Application> getApplicants(@PathVariable Long jobId) {
        return applicationService.getApplicationsByJob(jobId);
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("/{id}/status")
    public String updateStatus(@PathVariable Long id,
                               @RequestParam ApplicationStatus status) {
        return applicationService.updateStatus(id, status);
    }


    @PreAuthorize("permitAll()")
    @GetMapping("/my")
    public List<Application> getMyApplications() {
        String username = SecurityContextHolder
                .getContext().getAuthentication().getName();
        return applicationService.getApplicationsByUser(username);
    }
}

