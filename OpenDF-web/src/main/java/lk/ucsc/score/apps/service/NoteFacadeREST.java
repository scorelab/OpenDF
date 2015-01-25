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
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import lk.ucsc.score.apps.models.Note;
import javax.ws.rs.FormParam;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import lk.ucsc.score.apps.uploaders.Validator;
import org.jsoup.Jsoup;
import org.jsoup.safety.*;
import lk.ucsc.score.apps.models.Project;
import lk.ucsc.score.apps.models.File;
/**
 *
 * @author Acer
 */
@Stateless
@Path("note")
public class NoteFacadeREST extends AbstractFacade<Note> {
    @PersistenceContext(unitName = "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public NoteFacadeREST() {
        super(Note.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(Note entity) {
        entity.setDescription(Jsoup.clean(entity.getDescription(), Whitelist.basic()));
        super.create(entity);        
        em.refresh(em.find(Project.class, entity.getIdProject().getIdProject()));     
        em.refresh(em.find(File.class, entity.getIdFile().getIdFile()));
    }

    @PUT
    @Override
    @Consumes({"application/xml", "application/json"})
    public void edit(Note entity) {
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
    public Note find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Note> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Note> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }


    @GET
    @Path("of/{idProject}")
    @Produces({"application/xml", "application/json"})
    public List<Note> findRange( @PathParam("idProject") Integer idProject) {
        return em.createNamedQuery("Note.findByIdProject").setParameter("idProject", idProject).getResultList();
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
