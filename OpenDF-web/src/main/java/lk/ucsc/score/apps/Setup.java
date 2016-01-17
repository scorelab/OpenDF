/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps;

import java.io.IOException;
import java.io.PrintWriter;
import javax.naming.InitialContext;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.UserTransaction;
import lk.ucsc.score.apps.models.User;
import org.mindrot.jbcrypt.BCrypt;

/**
 *
 * @author lucasjones
 */
@WebServlet(name = "Setup", urlPatterns = {"/initialsetup"})
public class Setup extends HttpServlet {

    @PersistenceUnit(unitName = "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU")
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory( "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU" );
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
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
            EntityManager em = emf.createEntityManager();

            Long numUsers = (Long) em.createNamedQuery("User.count").getSingleResult();
            System.out.println("Number of users: " + numUsers);
            if (numUsers == null || numUsers > 0) { response.sendRedirect("setup.jsp?msg=OpenDF is already set up");return; }

            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String passwordConfirm = request.getParameter("password_confirm");
            String email = request.getParameter("email");
            String name = request.getParameter("name");
            if (username.length() < 5) { response.sendRedirect("setup.jsp?msg=Username too short");return; }
            if (password.length() < 8) { response.sendRedirect("setup.jsp?msg=Password too short");return; }
            if (password.length() > 30) { response.sendRedirect("setup.jsp?msg=Password too long");return; }
            if (!password.equals(passwordConfirm)) { response.sendRedirect("setup.jsp?msg=Passwords do not match");return; }
            if (email.length() < 5) { response.sendRedirect("setup.jsp?msg=Email is too short");return; }
            if (name.length() < 1) { response.sendRedirect("setup.jsp?msg=Name is too short");return; }
            User user = new User();
            user.setUsername(username);
            user.setName(name);
            user.setEmail(email);
            user.setPassword(UserLogin.HASHED_PASSWORD_PREFIX + BCrypt.hashpw(password, BCrypt.gensalt()));
            user.setLevel(0);
            
            // Use a transaction so that we can get the new user's id
            UserTransaction transaction = (UserTransaction) new InitialContext().lookup("java:comp/UserTransaction");
            transaction.begin();
            em.joinTransaction();
            em.persist(user);
            em.flush();
            transaction.commit();
            
            System.out.println("User: " + user + " ID: " + user.getIdUser());

            request.getSession().setAttribute("user", user.getIdUser());
            response.sendRedirect("index.jsp");
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
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
     * Handles the HTTP <code>POST</code> method.
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
