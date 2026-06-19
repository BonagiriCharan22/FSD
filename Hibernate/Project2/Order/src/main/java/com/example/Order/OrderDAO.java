package com.example.Order;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class OrderDAO {
    public void saveOrder(Order order) {

        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        session.persist(order);

        tx.commit();
        session.close();

        System.out.println("Order Saved Successfully");
    }
    public Order getOrderById(int id) {

        Session session = Utility.getSessionFactory().openSession();

        Order order = session.get(Order.class, id);

        session.close();

        return order;
    }

    public List<Order> getAllOrders() {

        Session session = Utility.getSessionFactory().openSession();

        List<Order> orders = session
                .createQuery("from Order", Order.class)
                .list();

        session.close();

        return orders;
    }

    public void updateOrder(int id, String status) {
        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        Order order = session.get(Order.class, id);

        if (order != null) {
            order.setOrderStatus(status);
            session.merge(order);
            System.out.println("Order Updated Successfully");
        } else {
            System.out.println("Order Not Found");
        }

        tx.commit();
        session.close();
    }
    public void deleteOrder(int id) {

        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        Order order = session.get(Order.class, id);

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