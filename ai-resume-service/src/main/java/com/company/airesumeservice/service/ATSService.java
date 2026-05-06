package com.company.airesumeservice.service;


import com.company.airesumeservice.entity.Resume;
import com.company.airesumeservice.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class ATSService {


    @Autowired private ResumeRepository resumeRepository;


    public Resume analyzeResume(Resume resume) {


        // Split skills into lists (comma separated)
        List<String> candidateSkills = Arrays.stream(
                        resume.getSkills().toLowerCase().split(","))
                .map(String::trim)
                .collect(Collectors.toList());


        List<String> requiredSkills = Arrays.stream(
                        resume.getRequiredSkills().toLowerCase().split(","))
                .map(String::trim)
                .collect(Collectors.toList());


        // Find matched skills
        List<String> matched = candidateSkills.stream()
                .filter(requiredSkills::contains)
                .collect(Collectors.toList());


        // Find missing skills
        List<String> missing = requiredSkills.stream()
                .filter(skill -> !candidateSkills.contains(skill))
                .collect(Collectors.toList());


        // Calculate ATS score
        int score = requiredSkills.isEmpty() ? 0 :
                (int) ((matched.size() * 100.0) / requiredSkills.size());


        resume.setMatchedSkills(String.join(", ", matched));
        resume.setMissingSkills(String.join(", ", missing));
        resume.setAtsScore(score);


        return resumeRepository.save(resume);
    }
}
