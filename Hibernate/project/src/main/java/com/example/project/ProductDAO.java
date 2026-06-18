package com.example.project;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class ProductDAO {
    public void addProduct(Product product) {
        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        session.persist(product);
        tx.commit();
        session.close();
    }
    public Product findById(int id) {
        Session session = Utility.getSessionFactory().openSession();
        Product product = session.get(Product.class, id);
        session.close();
        return product;
    }
    public List<Product> findAll() {
        Session session = Utility.getSessionFactory().openSession();
        List<Product> products =
                session.createQuery("from Product", Product.class).list();
        session.close();
        return products;
    }
    public void updateProduct(Product product) {
        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        session.merge(product);
        tx.commit();
        session.close();
    }
    public void deleteProduct(int id) {
        Session session = Utility.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Product product = session.get(Product.class, id);
        if (product != null) {
            session.remove(product);
        }
        tx.commit();
        session.close();
    }
}