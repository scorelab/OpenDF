/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Acer
 */
@WebServlet(name = "SheduleWork", urlPatterns = {"/Work/SheduleWork"})
public class SheduleWork extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            out.println("Starting");
            InitialContext init = new InitialContext();
            out.println("InitialContext");
            javax.jms.Queue destination =
                    (javax.jms.Queue) init.lookup("jms/Work");
            out.println("Queue built");
            ConnectionFactory connectionFactory =
                    (ConnectionFactory) init.lookup("jms/WorkFactory");
            out.println("Factory setted up");
            Connection connection = connectionFactory.createConnection();
            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            out.println("Session created");
            TextMessage message = session.createTextMessage();
            message.setText("start "+request.getParameter("id"));
            connection.start();
            out.println("conecting started");
            MessageProducer producer = session.createProducer(destination);
            producer.setDeliveryMode(DeliveryMode.PERSISTENT);
            producer.send(message);
            System.out.println("Sent");
            out.println("Sent");
//              message = null;
//
//              MessageConsumer consumer = session.createConsumer(destination);
//              message = (TextMessage) consumer.receive(1000);
//              if( message!=null ) {
//                out.println(message.getText());
//              }

            producer.close();
            //consumer.close();
            session.close();
            connection.close();

        } catch (JMSException ex) {
            Logger.getLogger(SheduleWork.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NamingException ex) {
            Logger.getLogger(SheduleWork.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
