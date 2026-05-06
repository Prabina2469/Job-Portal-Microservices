package com.company.jobservice.service;

import com.company.jobservice.entity.Job;
import com.company.jobservice.repository.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class JobService {


    @Autowired
    private JobRepo jobRepository;


    public Job createJob(Job job) {
        return jobRepository.save(job);
    }


    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }


    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }


    public Job updateJob(Long id, Job updated) {
        Job job = getJobById(id);
        job.setTitle(updated.getTitle());
        job.setDescription(updated.getDescription());
        job.setLocation(updated.getLocation());
        job.setSalary(updated.getSalary());
        job.setRequiredSkills(updated.getRequiredSkills());
        return jobRepository.save(job);
    }


    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
