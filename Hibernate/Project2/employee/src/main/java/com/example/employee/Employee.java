package com.example.employee;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Employee {
	@Id
	private int employee_id;
	private String employe_name;
	private String department;
	private double salary;
	private Date joiningDate;
	public void setDepartment(String department) {
		this.department = department;
	}
	public void setEmploye_name(String employe_name) {
		this.employe_name = employe_name;
	}
	public void setEmployee_id(int employee_id) {
		this.employee_id = employee_id;
	}
	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}
	public String getDepartment() {
		return department;
	}
	public String getEmploye_name() {
		return employe_name;
	}
	public int getEmployee_id() {
		return employee_id;
	}
	public Date getJoiningDate() {
		return joiningDate;
	}
	public double getSalary() {
		return salary;
	}

}
