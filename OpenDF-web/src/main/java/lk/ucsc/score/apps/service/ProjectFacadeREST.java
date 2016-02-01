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
import lk.ucsc.score.apps.Authentication;
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
        Authentication.assertUserHasAccess(request);
        
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
        Authentication.assertUserIsAdmin(request, em);
        
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
        Authentication.assertUserIsAdmin(request, em);
        
        User user =  em.find(User.class, idUser);
        Project project =  em.find(Project.class, id);

        project.getUserCollection().remove(user); // useful to maintain coherence, but ignored by JPA
        user.getProjectCollection().remove(project);
        getEntityManager().persist(project);
        getEntityManager().persist(user);   
    }

    @PUT
    @Consumes({"application/xml", "application/json"})
    public void edit(@Context HttpServletRequest request, Project entity) {
        Authentication.assertUserHasProject(request, em, entity.getIdProject());
        
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@Context HttpServletRequest request, @PathParam("id") Integer id) {
        Authentication.assertUserHasProject(request, em, id);
        
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Project find(@Context HttpServletRequest request, @PathParam("id") Integer id) {
        Authentication.assertUserHasProject(request, em, id);
        
        return super.find(id);
    }

    @GET
    @Produces({"application/xml", "application/json"})
    public Collection<Project> findAll(@Context HttpServletRequest request) {
        Authentication.assertUserHasAccess(request);

        Object idUser = Authentication.getUserId(request);

        User user =  em.find(User.class, (Integer)idUser);
        System.out.println("Username:  "+user.getUsername()+user.getIdUser()+user.getProjectCollection().toString());
        return user.getProjectCollection();
    }

    @GET
    @Path("{id}/diskImages")
    @Produces({"application/xml", "application/json"})
    public Collection<Diskimage> getDiskimages(@Context HttpServletRequest request, @PathParam("id") Integer id) {
        Authentication.assertUserHasProject(request, em, id);
        
        return super.find(id).getDiskimageCollection();
    }

    @GET
    @Path("{id}/file/{idFile}")
    @Produces({"application/xml", "application/json"})
    public File getFile(@Context HttpServletRequest request, @PathParam("id") Integer id,  @PathParam("idFile") @DefaultValue("-1") Integer idFile) {
        Authentication.assertUserHasProject(request, em, id);
        
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
    public Collection<File> getFile(@Context HttpServletRequest request, @PathParam("id") Integer idProject,  @PathParam("type")  String type) {
        Authentication.assertUserHasProject(request, em, idProject);
        
        Collection<File> childrens = (Collection<File>)em.createNamedQuery("File.findByType").setParameter("type", "%."+type).setParameter("idProject", idProject).getResultList();
        return childrens;
   }
    @GET
    @Path("{id}/files/types")
    @Produces({"application/xml", "application/json"})
    public Collection<File> getFileTypes(@Context HttpServletRequest request, @PathParam("id") Integer idProject,  @PathParam("type")  String type) {
        Authentication.assertUserHasProject(request, em, idProject);
        
        Collection<File> childrens = (Collection<File>)em.createNamedQuery("File.findTypes")
                //.setParameter("type", "%."+type)
                //.setParameter("idProject", idProject)
                .getResultList();
        return childrens;
   }

    @GET
    @Path("{id}/investigators")
    @Produces({"application/xml", "application/json"})
    public Collection<User> getInvestigators(@Context HttpServletRequest request, @PathParam("id") Integer id) {
        Authentication.assertUserHasProject(request, em, id);
        
        return super.find(id).getUserCollection();
    }

    @GET
    @Path("{id}/other-investigators")
    @Produces({"application/xml", "application/json"})
    public Collection<User> getOtherInvestigators(@Context HttpServletRequest request, @PathParam("id") Integer id) {
        Authentication.assertUserHasProject(request, em, id);
        
        return em.createNamedQuery("User.findNonInvestigatorsOfaProject").setParameter("idProject", id).getResultList();
    }
    
    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<Project> findRange(@Context HttpServletRequest request, @PathParam("from") Integer from, @PathParam("to") Integer to) {
        Authentication.assertUserHasAccess(request);
        
        // TODO: Limit this to projects user has access to, or remove it
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST(@Context HttpServletRequest request) {
        Authentication.assertUserHasAccess(request);
        
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
