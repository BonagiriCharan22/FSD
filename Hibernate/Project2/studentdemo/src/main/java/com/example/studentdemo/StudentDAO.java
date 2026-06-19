package com.example.studentdemo;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class StudentDAO {
    public void saveOrder(Student order) {

        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        session.persist(order);

        tx.commit();
        session.close();

        System.out.println("Order Saved Successfully");
    }
    public Student getOrderById(int id) {

        Session session = Utility.getSessionFactory().openSession();

        Student order = session.get(Student.class, id);

        session.close();

        return order;
    }

    public List<Student> getAllOrders() {

        Session session = Utility.getSessionFactory().openSession();

        List<Student> orders = session
                .createQuery("from Student", Student.class)
                .list();

        session.close();

        return orders;
    }

    public void updateOrder(int id, String status) {
        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        Student order = session.get(Student.class, id);

        if (order != null) {
            order.setStudent_name(status);
            session.merge(order);
            System.out.println("Student Updated Successfully");
        } else {
            System.out.println("Student Not Found");
        }

        tx.commit();
        session.close();
    }
    public void deleteOrder(int id) {

        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        Student order = session.get(Student.class, id);

        if (order != null) {
            session.remove(order);
            System.out.println("Order Deleted Successfully");
        } else {
            System.out.println("Order Not Found");
        }

        tx.commit();
        session.close();
    }
}