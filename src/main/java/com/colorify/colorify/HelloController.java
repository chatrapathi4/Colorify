package com.colorify.colorify;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @CrossOrigin(origins = "http://localhost:3000")  // Allow React frontend
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Colorify is working!";
    }
}
