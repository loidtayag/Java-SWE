package com.example.demo;

import com.example.demo.database.Address;
import com.example.demo.database.User;
import com.example.demo.database.Setting;
import com.example.demo.database.Team;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(value = "/test/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>" + message + "</h1>");
        out.println("</body></html>");

        User user = new User();
        user.setPassword("hehe");
        user.setName("Jim Bob");
        Address address = new Address();
        address.setCode("FT7 DF2J");
        address.setCountry("Antarctica");
        user.setAddress(address);
        user.setEmail("JimBoblical@gmail.com");
        user.setPkID(0);

        Configuration config = new Configuration().configure().addAnnotatedClass(User.class).addAnnotatedClass(Setting.class).addAnnotatedClass(Team.class);
        SessionFactory sF = config.buildSessionFactory();
        Session s = sF.openSession();
        Transaction transaction = s.beginTransaction();
//        s.persist(user);
//        System.out.println(s.get(User.class, 0).toString());
        transaction.commit();
        s.close();
        Session s1 = sF.openSession();
        transaction = s1.beginTransaction();
//        System.out.println(s1.get(User.class, 0).toString());
        transaction.commit();
        s1.close();
    }

    public void destroy() {
    }
}