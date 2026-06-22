package com.example.student.loader;

import com.example.student.model.Student;
import com.example.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.Base64;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    private static final String DEFAULT_PHOTO_SVG = "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" fill=\"%23800000\"><circle cx=\"50\" cy=\"35\" r=\"20\"/><path d=\"M50 60c-25 0-35 15-35 20v5h70v-5c0-5-10-20-35-20z\"/></svg>";

    @Override
    public void run(String... args) throws Exception {
        if (studentRepository.count() == 0) {
            System.out.println("No student records found in database. Seeding default mock data...");

//            String charanPhoto = DEFAULT_PHOTO_SVG;
            File charanFile = new File("/Users/bonagirinikitha/FSD-B2/ResponsiveStudentManagementPortal/charan copy.jpeg");
            if (charanFile.exists()) {
                try {
                    byte[] fileContent = Files.readAllBytes(charanFile.toPath());
//                    charanPhoto = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(fileContent);
                    System.out.println("Successfully read and encoded charan copy.jpeg for startup seeding.");
                } catch (Exception e) {
                    System.err.println("Error reading charan copy.jpeg, using fallback SVG photo: " + e.getMessage());
                }
            } else {
                System.out.println("charan copy.jpeg not found in frontend path, using fallback SVG photo.");
            }

            Student charan = new Student();
            charan.setRollNumber("22B81A1201");
            charan.setFullName("Charan");
            charan.setBranch("CSE");
            charan.setAttendance("95%");
            charan.setEmail("charan@gmail.com");
            charan.setMobile("9876543210");
            charan.setGender("Male");
            charan.setDob(LocalDate.of(2004, 6, 12));
            charan.setAddress("H.No: 4-12/A, Ibrahimpatnam, Hyderabad, Pin Code: 501510");
//            charan.setPhoto(charanPhoto);
            studentRepository.save(charan);

            Student rahul = new Student();
            rahul.setRollNumber("22B81A1202");
            rahul.setFullName("Rahul");
            rahul.setBranch("ECE");
            rahul.setAttendance("82%");
            rahul.setEmail("rahul@gmail.com");
            rahul.setMobile("9876543211");
            rahul.setGender("Male");
            rahul.setDob(LocalDate.of(2004, 8, 15));
            rahul.setAddress("H.No: 12-5/B, L.B. Nagar, Hyderabad, Pin Code: 500074");
//            rahul.setPhoto(DEFAULT_PHOTO_SVG);
            studentRepository.save(rahul);

            Student priya = new Student();
            priya.setRollNumber("22B81A1203");
            priya.setFullName("Priya");
            priya.setBranch("IT");
            priya.setAttendance("92%");
            priya.setEmail("priya@gmail.com");
            priya.setMobile("9876543212");
            priya.setGender("Female");
            priya.setDob(LocalDate.of(2004, 11, 22));
            priya.setAddress("H.No: 3-8/C, Dilshuknagar, Hyderabad, Pin Code: 500060");
//            priya.setPhoto(DEFAULT_PHOTO_SVG);
            studentRepository.save(priya);

            Student akash = new Student();
            akash.setRollNumber("22B81A1204");
            akash.setFullName("Akash");
            akash.setBranch("EEE");
            akash.setAttendance("68%");
            akash.setEmail("akash@gmail.com");
            akash.setMobile("9876543213");
            akash.setGender("Male");
            akash.setDob(LocalDate.of(2004, 1, 30));
            akash.setAddress("H.No: 9-2/A, Secunderabad, Hyderabad, Pin Code: 500003");
//            akash.setPhoto(DEFAULT_PHOTO_SVG);
            studentRepository.save(akash);

            Student sneha = new Student();
            sneha.setRollNumber("22B81A1205");
            sneha.setFullName("Sneha");
            sneha.setBranch("CSE");
            sneha.setAttendance("97%");
            sneha.setEmail("sneha@gmail.com");
            sneha.setMobile("9876543214");
            sneha.setGender("Female");
            sneha.setDob(LocalDate.of(2004, 5, 4));
            sneha.setAddress("H.No: 7-1/D, Gachibowli, Hyderabad, Pin Code: 500032");
//            sneha.setPhoto(DEFAULT_PHOTO_SVG);
            studentRepository.save(sneha);

            System.out.println("Default mock student records successfully seeded!");
        } else {
            System.out.println("Student database already populated. Skipping database seeding.");
        }
    }
}
