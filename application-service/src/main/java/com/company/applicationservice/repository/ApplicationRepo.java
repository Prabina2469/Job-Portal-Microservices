package com.company.applicationservice.repository;


import com.company.applicationservice.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ApplicationRepo extends JpaRepository<Application, Long> {
    List<Application> findByJobId(Long jobId);
    boolean existsByJobIdAndUsername(Long jobId, String username);
    List<Application> findByUsername(String username);
}

