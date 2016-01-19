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
import lk.ucsc.score.apps.models.User;
import javax.ws.rs.FormParam;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import lk.ucsc.score.apps.UserLogin;
import lk.ucsc.score.apps.uploaders.Validator;
import org.mindrot.jbcrypt.BCrypt;
/**
 *
 * @author Acer
 */
@Stateless
@Path("user")
public class UserFacadeREST extends AbstractFacade<User> {
    @PersistenceContext(unitName = "lk.ucsc.score.apps_OpenDF-web_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public UserFacadeREST() {
        super(User.class);
    }

    @POST
    @Override
    @Consumes({"application/xml", "application/json"})
    public void create(User entity) {
        entity.setLevel(1);
        super.create(entity);
    }

    @PUT
    @Override
    @Consumes({"application/xml", "application/json"})
    public void edit(User entity) {
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
    public User find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<User> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({"application/xml", "application/json"})
    public List<User> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }
    
    @POST
    @Path("change/password")
    @Produces({"application/xml", "application/json"})
    public void changePassword(@FormParam("password") String password, @FormParam("repassword") String repassword, @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        Object idUser =  session.getAttribute("user"); 
        if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        if(!password.equals(repassword) ){ throw new ServiceException(500, "Passwords do not match"); }
        if(password.length() <  8 ){ throw new ServiceException(500, "Password too short"); }
        if(password.length() > 30 ){ throw new ServiceException(500, "Password too long"); }
        User user = em.find(User.class, (Integer)idUser);
        user.setPassword(UserLogin.HASHED_PASSWORD_PREFIX + BCrypt.hashpw(password, BCrypt.gensalt()));
        em.persist(user);
    }
    
    @POST
    @Path("change/username")
    @Produces({"application/xml", "application/json"})
    public void changeUsername(@FormParam("username") String username, @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        Object idUser =  session.getAttribute("user"); 
        if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        if(username.length() <  8 ){ throw new ServiceException(500, "username too short"); }
        if(username.length() > 100 ){ throw new ServiceException(500, "username too long"); }
        User user =  em.find(User.class, (Integer)idUser);
        user.setUsername(username);
        em.persist(user);
    }
    
    @POST
    @Path("change/displayname")
    @Produces({"application/xml", "application/json"})
    public void changePassword(@FormParam("username") String username, @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        Object idUser =  session.getAttribute("user"); 
        if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        if(username.length() <  8 ){ throw new ServiceException(500, "Display name too short"); }
        if(username.length() > 300 ){ throw new ServiceException(500, "Display name too long"); }
        User user =  em.find(User.class, (Integer)idUser);
        user.setUsername(username);
        em.persist(user);
    }
    @POST
    @Path("change/email")
    @Produces({"application/xml", "application/json"})
    public void changeEmail(@FormParam("email") String email, @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        Object idUser =  session.getAttribute("user"); 
        if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        if(!Validator.validateEmail(email)){ throw new ServiceException(500, "email not in correct form"); }
        if(email.length() > 200 ){ throw new ServiceException(500, "email too long"); }
        User user =  em.find(User.class, (Integer)idUser);
        user.setEmail(email);
        em.persist(user);
    }

    @GET
    @Path("current")
    @Produces({"application/xml", "application/json"})
    public User current( @Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null ){ throw new ServiceException(401, "Not authorized"); }
        Object idUser =  session.getAttribute("user"); 
        if(idUser == null ){ throw new ServiceException(401, "Not authorized"); }
        User user =  em.find(User.class, (Integer)idUser);
        return user;
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
