/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.service;

import java.util.Collection;
import java.util.List;
import java.util.Date;
import java.util.ArrayList;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import lk.ucsc.score.apps.models.Project;
import lk.ucsc.score.apps.models.Diskimage;
import lk.ucsc.score.apps.models.User;

/**
 *
 * @author Acer
 */
@Stateless
@Path("project")
public class ProjectFacadeREST extends AbstractFacade<Project> {
    @PersistenceContext(unitName = "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public ProjectFacadeREST() {
        super(Project.class);
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    public void create(Project entity, @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        Object idUser =  session.getAttribute("user"); 
        if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        User user =  em.find(User.class, (Integer)idUser);
    Collection<User> users = new ArrayList<User>();
    users.add(user);
    entity.setUserCollection(users); // useful to maintain coherence, but ignored by JPA
    entity.setCreatedDate(new Date());
    entity.setStatus(1);
    getEntityManager().persist(entity);

    user.getProjectCollection().add(entity);
    }

    @PUT
    @Override
    @Consumes({"application/xml", "application/json"})
    public void edit(Project entity) {
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
    public Project find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public Collection<Project> findAll(@Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        Object idUser =  session.getAttribute("user"); 
        if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        User user =  em.find(User.class, (Integer)idUser);
        System.out.println("Username:  "+user.getUsername()+user.getIdUser()+user.getProjectCollection().toString());
        return user.getProjectCollection();
    }

    @GET
    @Path("{id}/diskImages")
    @Produces({"application/xml", "application/json"})
    public Collection<Diskimage> getDiskimages(@PathParam("id") Integer id) {
        return super.find(id).getDiskimageCollection();
    }
    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Project> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
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
