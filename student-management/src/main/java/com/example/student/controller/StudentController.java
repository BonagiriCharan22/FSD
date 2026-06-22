package com.example.student.controller;

import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{rollNumber}")
    public ResponseEntity<Student> getStudentByRollNumber(@PathVariable String rollNumber) {
        Optional<Student> student = studentRepository.findById(rollNumber);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student createOrUpdateStudent(@RequestBody Student student) {
        // Set default values if not provided by client
        if (student.getAttendance() == null || student.getAttendance().trim().isEmpty()) {
            student.setAttendance("100%");
        }
        return studentRepository.save(student);
    }

    @DeleteMapping("/{rollNumber}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String rollNumber) {
        if (studentRepository.existsById(rollNumber)) {
            studentRepository.deleteById(rollNumber);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
