package lk.ucsc.score.apps;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
        User user = em.find(User.class, userId);
        if (user == null) {
            return false;
        }
        return user.getLevel() == 0;
    }

    public static void assertUserHasAccess(HttpServletRequest request) {
        if(!userHasAccess(request)) {
            throw new ServiceException(401, "Unauthorized");
        }
    }

    public static void assertUserIsAdmin(HttpServletRequest request, EntityManager em) {
        if(!userIsAdmin(request, em)) {
            throw new ServiceException(401, "Insufficient access level");
        }
    }
}
