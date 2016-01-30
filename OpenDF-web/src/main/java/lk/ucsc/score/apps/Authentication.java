package lk.ucsc.score.apps;

import java.util.Collection;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import lk.ucsc.score.apps.models.Project;
import lk.ucsc.score.apps.models.User;
import lk.ucsc.score.apps.service.ServiceException;

/**
 *
 * @author lucasjones
 */
public class Authentication {
    public static Object getUserId(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session == null) {
            return null;
        }
        return session.getAttribute("user");
    }

    public static boolean userHasAccess(HttpServletRequest request) {
        return getUserId(request) != null;
    }

    public static boolean userIsAdmin(HttpServletRequest request, EntityManager em) {
        Object userId = getUserId(request);
        if (userId == null) {
            return false;
        }
        User user = em.find(User.class, userId);
        if (user == null) {
            return false;
        }
        return user.getLevel() == 0;
    }

    public static boolean userHasProject(HttpServletRequest request, EntityManager em, int idProject) {
        Object userId = getUserId(request);
        if (userId == null) {
            return false;
        }
        User user = em.find(User.class, userId);
        if (user == null) {
            return false;
        }
        Collection<Project> projects = user.getProjectCollection();
        for (Project project : projects) {
            if (project.getIdProject() == idProject) {
                return true;
            }
        }
        return false;
    }

    /**
     * Throws a ServiceException if the user is not logged in
     */
    public static void assertUserHasAccess(HttpServletRequest request) throws ServiceException {
        if(!userHasAccess(request)) {
            throw new ServiceException(401, "Unauthorized");
        }
    }

    /**
     * Throws a ServiceException if the user is not an administrator
     */
    public static void assertUserIsAdmin(HttpServletRequest request, EntityManager em) throws ServiceException {
        if(!userIsAdmin(request, em)) {
            throw new ServiceException(401, "Insufficient access level");
        }
    }

    /**
     * Throws a ServiceException if the user does not have access to the project with id 'idProject'
     */
    public static void assertUserHasProject(HttpServletRequest request, EntityManager em, int idProject) throws ServiceException {
        if (!userHasProject(request, em, idProject)) {
            throw new ServiceException(401, "Insufficient access level");
        }
    }
}
