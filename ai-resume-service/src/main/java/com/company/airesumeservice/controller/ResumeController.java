package com.company.airesumeservice.controller;


import com.company.airesumeservice.entity.Resume;
import com.company.airesumeservice.service.ATSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/resume")
public class ResumeController {


    @Autowired private ATSService atsService;


    @PreAuthorize("hasRole('CANDIDATE')")
    @PostMapping("/analyze")
    public Resume analyze(@RequestBody Resume resume) {
        return atsService.analyzeResume(resume);
    }
}
