/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.models;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Acer
 */

@XmlRootElement(name="error")
public class ErrorResponse {
    private int errorCode;
    private String message;

    public ErrorResponse(){}
    public ErrorResponse(int errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    /**
     * @return the errorCode
     */
    @XmlElement(name = "errorCode")
    public int getErrorCode() {
        return errorCode;
    }

    /**
     * @param errorCode the errorCode to set
     */
    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * @return the message
     */
    @XmlElement(name = "errorMessage")
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }
    
    
}
