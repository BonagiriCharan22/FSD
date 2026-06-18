package com.example.project;

import java.util.List;
import java.util.Scanner;

public class App {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        ProductDAO dao = new ProductDAO();

        while (true) {
            System.out.println("1. Add Product");
            System.out.println("2. Find Product By Id");
            System.out.println("3. Find All Products");
            System.out.println("4. Update Product");
            System.out.println("5. Delete Product");
            System.out.println("6. Exit");
            System.out.print("Enter Choice: ");
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    Product p = new Product();
                    System.out.print("Enter Id: ");
                    p.setId(sc.nextInt());
                    sc.nextLine();
                    System.out.print("Enter Name: ");
                    p.setName(sc.nextLine());
                    System.out.print("Enter Price: ");
                    p.setPrice(sc.nextDouble());
                    dao.addProduct(p);
                    System.out.println("Product Added Successfully");
                    break;
                case 2:
                    System.out.print("Enter Product Id: ");
                    int id = sc.nextInt();
                    Product product = dao.findById(id);
                    if (product != null) {
                        System.out.println("Id : " + product.getId());
                        System.out.println("Name : " + product.getName());
                        System.out.println("Price : " + product.getPrice());
                    } else {
                        System.out.println("Product Not Found");
                    }
                    break;
                case 3:
                    List<Product> products = dao.findAll();
                    if (products.isEmpty()) {
                        System.out.println("No Products Found");
                    } else {
                        for (Product pr : products) {
                            System.out.println(
                                    pr.getId() + " "
                                    + pr.getName() + " "
                                    + pr.getPrice());
                        }
                    }
                    break;
                case 4:
                    System.out.print("Enter Product Id To Update: ");
                    int updateId = sc.nextInt();
                    Product updateProduct = dao.findById(updateId);
                    if (updateProduct != null) {
                        sc.nextLine();
                        System.out.print("Enter New Name: ");
                        updateProduct.setName(sc.nextLine());
                        System.out.print("Enter New Price: ");
                        updateProduct.setPrice(sc.nextDouble());
                        dao.updateProduct(updateProduct);
                        System.out.println("Product Updated Successfully");
                    } else {
                        System.out.println("Product Not Found");
                    }
                    break;
                case 5:
                    System.out.print("Enter Product Id To Delete: ");
                    int deleteId = sc.nextInt();
                    dao.deleteProduct(deleteId);
                    System.out.println("Product Deleted Successfully");
                    break;
                case 6:
                    Utility.shutdown();
                    sc.close();
                    System.out.println("Application Closed");
                    System.exit(0);
                default:
                    System.out.println("Invalid Choice");
            }
        }
    }
}