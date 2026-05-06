package com.company.authservice.service;

import com.company.authservice.entity.User;
import com.company.authservice.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public String deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            return "User not found";
        }
        userRepository.deleteById(id);
        return "User deleted successfully";
    }
}
