/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.service;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import lk.ucsc.score.apps.models.Report;
import lk.ucsc.score.apps.models.Log;
import javax.ws.rs.FormParam;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import lk.ucsc.score.apps.uploaders.Validator;
import lk.ucsc.score.apps.models.Project;
import org.jsoup.Jsoup;
import org.jsoup.safety.*;
import java.io.PrintWriter;
import java.io.FileNotFoundException;import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;
import java.util.Date;
/**
 *
 * @author Acer
 */
@Stateless
@Path("report")
public class ReportFacadeREST extends AbstractFacade<Report> {
    @PersistenceContext(unitName = "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public ReportFacadeREST() {
        super(Report.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Report entity) {
        super.create(entity);
    }

    @POST
    @Path("upload")
    public void upload(@FormParam("title") String title, @FormParam("content") String content, @FormParam("idProject") int idProject) {
        String safeContent = Jsoup.clean(content, Whitelist.relaxed().addAttributes(":all", "style"));
        System.out.println(safeContent);
        try{
            String uuid = UUID.randomUUID().toString();
            PrintWriter out = new PrintWriter("assets/"+uuid+".htm");
            out.println(safeContent);
            out.close();
            Report entity = new Report();
            entity.setIdProject(em.find(Project.class, idProject));
            entity.setPath(uuid);
            entity.setTitle(title);
            entity.setCreatedDate(new Date());
            super.create(entity);
            getEntityManager().persist(new Log("A new report generated", em.find(Project.class, idProject)));
        }catch(FileNotFoundException e){
            System.out.println(e);
        }
    }

    @GET
    @Path("proxy/{id}")
    public Response getFile(@PathParam("id") String id) {

        File f = new File("assets/"+id+".htm");

        ResponseBuilder response = Response.ok((Object) f);
        response.type("text/html");
        response.header("Content-Disposition", "attachment; filename=\"report.htm\"");
        return response.build();
    }
    
    @PUT
    @Override
    @Consumes({"application/xml", "application/json"})
    public void edit(Report entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Report find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Report> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Report> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }


    @GET
    @Path("of/{idProject}")
    @Produces({"application/xml", "application/json"})
    public List<Report> findRange( @PathParam("idProject") Integer idProject) {
        return em.createNamedQuery("Report.findByIdProject").setParameter("idProject", idProject).getResultList();
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
