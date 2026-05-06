package com.company.jobservice.repository;

import com.company.jobservice.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface JobRepo extends JpaRepository<Job, Long> {
    List<Job> findByPostedBy(String postedBy);
}

