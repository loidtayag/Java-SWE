package com.loidtayag.portfolio;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setAttribute("result", "This is the result of the servlet call");
        try {
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        } catch (ServletException e) {
            throw new RuntimeException(e);
        }
    }

    public void destroy() {
    }
}