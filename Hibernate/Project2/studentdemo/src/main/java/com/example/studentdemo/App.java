package com.example.studentdemo;

import java.util.List;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StudentDAO dao = new StudentDAO();
        int choice;
        do {
            System.out.println("1. Add Student");
            System.out.println("2. Student by ID");
            System.out.println("3. View All Student details");
            System.out.println("4. Change Student name");
            System.out.println("5. Delete Student details");
            System.out.println("6. Exit");
            System.out.print("Enter Choice: ");
            choice = sc.nextInt();
            switch (choice) {
                case 1:
                    Student order = new Student();
                    System.out.print("Enter Student ID: ");
                    order.setStudent_id(sc.nextInt());
                    sc.nextLine();
                    System.out.print("Enter Student Name: ");
                    order.setStudent_name(sc.nextLine());
                    System.out.print("Enter Email: ");
                    order.setEmail(sc.nextLine());
                    System.out.print("Enter Couse ");
                    order.setCourse(sc.nextLine());
                    System.out.print("Enter Age ");
                    order.setAge(sc.nextInt());
                    sc.nextLine();
                    dao.saveOrder(order);
                    break;
                case 2:
                    System.out.print("Enter Order ID: ");
                    int id = sc.nextInt();
                    Student o = dao.getOrderById(id);
                    if (o != null) {
                        System.out.println(o);
                    } else {
                        System.out.println("Order Not Found");
                    }
                    break;
                case 3:
                    List<Student> orders = dao.getAllOrders();
                    for (Student ord : orders) {
                        System.out.println(ord);
                    }
                    break;
                case 4:
                    System.out.print("Enter ID: ");
                    int updateId = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter New name: ");
                    String status = sc.nextLine();
                    dao.updateOrder(updateId, status);
                    break;
                case 5:
                    System.out.print("Enter Order ID: ");
                    int deleteId = sc.nextInt();
                    dao.deleteOrder(deleteId);
                    break;
                case 6:
                    System.out.println("Thank You!");
                    break;
                default:
                    System.out.println("Invalid Choice!");
            }
        } while (choice != 6);
        sc.close();
    }
}