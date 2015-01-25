/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.service;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import lk.ucsc.score.apps.models.ErrorResponse;

/**
 *
 * @author Acer
 */
public class ServiceException extends WebApplicationException{

    public ServiceException(int error, String msg) {
        super(Response.status(Response.Status.UNAUTHORIZED).entity(new ErrorResponse(error , msg)).build());
    }
    
    
}
