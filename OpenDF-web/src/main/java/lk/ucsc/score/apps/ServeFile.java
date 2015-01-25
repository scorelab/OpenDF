/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package lk.ucsc.score.apps;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.sleuthkit.datamodel.AbstractFile;
import org.sleuthkit.datamodel.Content;
import org.sleuthkit.datamodel.Image;
import org.sleuthkit.datamodel.SleuthkitCase;
import org.sleuthkit.datamodel.SleuthkitJNI.CaseDbHandle.AddImageProcess;
import org.sleuthkit.datamodel.TskCoreException;
import org.sleuthkit.datamodel.TskDataException;
import org.sleuthkit.datamodel.AbstractFile;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;
import lk.ucsc.score.apps.models.Diskimage;
import lk.ucsc.score.apps.models.File;
/**
 *
 * @author agentmilindu
 */
@WebServlet(name="ServeFile", urlPatterns={"/ServeFile"})
public class ServeFile extends HttpServlet {
   @PersistenceUnit(unitName = "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU")
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory( "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU" );

    /** 
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        //PrintWriter out = response.getWriter();
        SleuthkitCase sk = null;
        try {
            String idFile = request.getParameter("idFile");
            EntityManager em = emf.createEntityManager();
            File fil = em.find(File.class, Integer.parseInt(idFile));
            Diskimage di = fil.getDiskImageidDiskImage();
            String path = di.getPath();
            System.out.println("file: " + fil.getName()+" di:"+di.getPath());
                
            
            sk = SleuthkitCase.openCase("uploads/"+di.getPath()+".db");
            List<AbstractFile> files = sk.findAllFilesWhere("name like '%"+fil.getName()+"%'");
            ServletOutputStream os = response.getOutputStream();
            for (AbstractFile file : files) {
                String mimeType = "";
                response.setContentType(mimeType != null? mimeType:"application/octet-stream");
                response.setContentLength((int)file.getSize());
                response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
                System.out.println("Found text file: " + file.getName()+" size:"+file.getSize ());
                long size = file.getSize ();
                if(file.canRead ()){
                   long offset = 0;
                   int chunkSize = 102400;
                   byte[] buffer = new byte[chunkSize];
                   int bytesRead;
                   while((bytesRead = file.read(buffer,offset, chunkSize ))>0){
                       os.write(buffer, 0, bytesRead);
                       offset += bytesRead;
                       if(offset>=size){ break; }
                   }
                }
            }
        } catch(Exception e){
        System.out.println(e);
        
        } finally { 
            if(sk!=null) sk.close();
        }
    } 

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
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
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
