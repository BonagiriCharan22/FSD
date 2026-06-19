package com.example.Order;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class Utility {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {

        if (sessionFactory == null) {
            sessionFactory = new Configuration()
                    .configure("hibernate.cfg.xml")
                    .addAnnotatedClass(Order.class)
                    .buildSessionFactory();
        }

        return sessionFactory;
    }
    public static void shutdown() {
    	sessionFactory.close();
    }
    
}