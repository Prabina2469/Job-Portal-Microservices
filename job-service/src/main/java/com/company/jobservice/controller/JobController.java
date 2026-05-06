package com.company.jobservice.controller;


import com.company.jobservice.entity.Job;
import com.company.jobservice.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/jobs")
public class JobController {


    @Autowired private JobService jobService;


    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        String username = SecurityContextHolder
                .getContext().getAuthentication().getName();
        job.setPostedBy(username);
        return jobService.createJob(job);
    }


    @PreAuthorize("hasAnyRole('CANDIDATE','RECRUITER','ADMIN')")
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }


    @PreAuthorize("hasAnyRole('CANDIDATE','RECRUITER','ADMIN')")
    @GetMapping("/{id}")
    public Job getJob(@PathVariable Long id) {
        return jobService.getJobById(id);
    }


    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }


    @PreAuthorize("hasRole('RECRUITER')")
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return "Job deleted successfully";
    }
}

