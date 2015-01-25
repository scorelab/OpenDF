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
import javax.persistence.TypedQuery;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import lk.ucsc.score.apps.models.Project;
import lk.ucsc.score.apps.models.Diskimage;
import lk.ucsc.score.apps.models.User;
import lk.ucsc.score.apps.models.File;
import javax.xml.bind.annotation.XmlTransient;
import javax.ws.rs.DefaultValue;
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

    @GET
    @Path("{id}/add-investigator")
    @Consumes({"application/xml", "application/json"})
    public void addInvestigator(@PathParam("id") Integer id, @QueryParam("user") Integer idUser , @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        //Object idUser =  session.getAttribute("user"); 
        //TODO Check if admin
        //if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        User user =  em.find(User.class, idUser);
        Project project =  em.find(Project.class, id);

        project.getUserCollection().add(user); // useful to maintain coherence, but ignored by JPA
        user.getProjectCollection().add(project);
        getEntityManager().persist(project);
        getEntityManager().persist(user);
        
    }

    @GET
    @Path("{id}/remove-investigator")
    @Consumes({"application/xml", "application/json"})
    public void removeInvestigator(@PathParam("id") Integer id, @QueryParam("user") Integer idUser , @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        //Object idUser =  session.getAttribute("user"); 
        //TODO Check if admin
        //if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        User user =  em.find(User.class, idUser);
        Project project =  em.find(Project.class, id);

        project.getUserCollection().remove(user); // useful to maintain coherence, but ignored by JPA
        user.getProjectCollection().remove(project);
        getEntityManager().persist(project);
        getEntityManager().persist(user);
        
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
    @Path("{id}/file/{idFile}")
    @Produces({"application/xml", "application/json"})
    public File getFile(@PathParam("id") Integer id,  @PathParam("idFile") @DefaultValue("-1") Integer idFile) {
        File file;
        if(idFile==-1){
             file = new File();
             file.setIsDir(1);
        }else{
             file = em.find(File.class, idFile);
        }
        em.flush();
        Collection<File> childrens = (Collection<File>)em.createNamedQuery("File.findByParentDirectoryN").setParameter(1, idFile).setParameter(2, id).getResultList();
        file.setChildrenCollection(childrens);
        return file;
   }
    @GET
    @Path("{id}/files/type/{type}")
    @Produces({"application/xml", "application/json"})
    public Collection<File> getFile(@PathParam("id") Integer idProject,  @PathParam("type")  String type) {
        
        Collection<File> childrens = (Collection<File>)em.createNamedQuery("File.findByType").setParameter("type", "%."+type).setParameter("idProject", idProject).getResultList();
        return childrens;
   }
    @GET
    @Path("{id}/files/types")
    @Produces({"application/xml", "application/json"})
    public Collection<File> getFileTypes(@PathParam("id") Integer idProject,  @PathParam("type")  String type) {
        
        Collection<File> childrens = (Collection<File>)em.createNamedQuery("File.findTypes")
                //.setParameter("type", "%."+type)
                //.setParameter("idProject", idProject)
                .getResultList();
        return childrens;
   }

    @GET
    @Path("{id}/investigators")
    @Produces({"application/xml", "application/json"})
    public Collection<User> getInvestigators(@PathParam("id") Integer id) {
        return super.find(id).getUserCollection();
    }

    @GET
    @Path("{id}/other-investigators")
    @Produces({"application/xml", "application/json"})
    public Collection<User> getOtherInvestigators(@PathParam("id") Integer id) {
        return em.createNamedQuery("User.findNonInvestigatorsOfaProject").setParameter("idProject", id).getResultList();
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
