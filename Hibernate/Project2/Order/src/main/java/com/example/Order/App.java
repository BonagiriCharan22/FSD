package com.example.Order;

import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        OrderDAO dao = new OrderDAO();
        int choice;
        do {
            System.out.println("1. Create Order");
            System.out.println("2. View Order By ID");
            System.out.println("3. View All Orders");
            System.out.println("4. Update Order Status");
            System.out.println("5. Delete Order");
            System.out.println("6. Exit");
            System.out.print("Enter Choice: ");
            choice = sc.nextInt();
            switch (choice) {
                case 1:
                    Order order = new Order();
                    System.out.print("Enter Order ID: ");
                    order.setOrderId(sc.nextInt());
                    sc.nextLine();
                    System.out.print("Enter Customer Name: ");
                    order.setCustomerName(sc.nextLine());
                    System.out.print("Enter Food Item: ");
                    order.setFoodItem(sc.nextLine());
                    System.out.print("Enter Quantity: ");
                    order.setQuantity(sc.nextInt());
                    System.out.print("Enter Total Amount: ");
                    order.setTotalAmount(sc.nextDouble());
                    order.setOrderDate(new Date());
                    sc.nextLine();
                    System.out.print("Enter Order Status: ");
                    order.setOrderStatus(sc.nextLine());
                    dao.saveOrder(order);
                    break;
                case 2:
                    System.out.print("Enter Order ID: ");
                    int id = sc.nextInt();
                    Order o = dao.getOrderById(id);
                    if (o != null) {
                        System.out.println(o);
                    } else {
                        System.out.println("Order Not Found");
                    }
                    break;
                case 3:
                    List<Order> orders = dao.getAllOrders();
                    for (Order ord : orders) {
                        System.out.println(ord);
                    }
                    break;
                case 4:
                    System.out.print("Enter Order ID: ");
                    int updateId = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter New Status: ");
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