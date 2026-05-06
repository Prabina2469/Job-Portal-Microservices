package com.company.applicationservice.client;


import com.company.applicationservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "job-service" , configuration = FeignConfig.class)
public interface JobServiceClient {

    @GetMapping("/jobs/{id}")
    Object getJobById(@PathVariable Long id);
}
