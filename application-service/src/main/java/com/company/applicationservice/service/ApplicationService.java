package com.company.applicationservice.service;

import com.company.applicationservice.client.JobServiceClient;
import com.company.applicationservice.entity.Application;
import com.company.applicationservice.entity.ApplicationStatus;
import com.company.applicationservice.repository.ApplicationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ApplicationService {


    @Autowired
    private ApplicationRepo applicationRepository;
    @Autowired
    private JobServiceClient jobServiceClient;


    public void applyJob(Long jobId, String username) {
        jobServiceClient.getJobById(jobId);


        boolean exists = applicationRepository
                .existsByJobIdAndUsername(jobId, username);
        if (exists) {
            throw new RuntimeException("Already applied for this job");
        }


        Application app = new Application();
        app.setJobId(jobId);
        app.setUsername(username);
        app.setStatus(ApplicationStatus.APPLIED);
        applicationRepository.save(app);
    }


    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }


    public String updateStatus(Long id, ApplicationStatus status) {
        Application app = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));
        app.setStatus(status);
        applicationRepository.save(app);
        return "Application " + id + " updated to " + status;
    }


    public List<Application> getApplicationsByUser(String username) {
        return applicationRepository.findByUsername(username);
    }
}

