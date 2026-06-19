package com.example.studentdemo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {
	@Id
	private int student_id;
	private String student_name;
	private String email;
	private String course;
	private int age;
	public void setAge(int age) {
		this.age = age;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	public Student() {
			}
	public Student(int student_id,String student_name,String email,String course,int age) {
		this.student_id=student_id;
		this.student_name=student_name;
		this.email=email;
		this.course=course;
		this.age=age;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public String getEmail() {
		return email;
	}
	public int getStudent_id() {
		return student_id;
	}
	public String getStudent_name() {
		return student_name;
	}
	public int getAge() {
		return age;
	}
	public String getCourse() {
		return course;
	}
	
	
}
