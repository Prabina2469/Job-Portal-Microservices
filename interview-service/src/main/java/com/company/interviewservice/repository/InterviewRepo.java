package com.company.interviewservice.repository;


import com.company.interviewservice.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface InterviewRepo extends JpaRepository<Interview, Long> {
    List<Interview> findByUsername(String username);
}
