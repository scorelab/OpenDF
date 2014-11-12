/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lk.ucsc.score.apps.models.User;

/**
 *
 * @author Acer
 */
@WebServlet(name = "UserLogin", urlPatterns = {"/userlogin"})
public class UserLogin extends HttpServlet {

    @PersistenceUnit(unitName = "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU")
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory( "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU" );

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
            
            EntityManager em = emf.createEntityManager();
                    List resultList = em.createNamedQuery("User.findByUsername")
                                             .setParameter("username", request.getParameter("username"))
                                             .getResultList();
                    
             User user;
             
             
            //TODO: Hash the password before comparing
            if(resultList.size()==0){
                response.sendRedirect("login.jsp?msg=User not found");
            }
            else if ((user = (User) resultList.get(0)).getPassword().equals(request.getParameter("password"))) {
                System.out.println(user);
                //TODO: Send the user token
                request.getSession().setAttribute("user", user.getIdUser());
                response.sendRedirect("index.jsp");
            } else {
                response.sendRedirect("login.jsp?msg=Wrong Password");
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        finally {
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
