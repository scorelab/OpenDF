/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.opendf;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.jms.Message;
import javax.jms.MessageListener;

/**
 *
 * @author Acer
 */
@MessageDriven(mappedName = "jms/Work", activationConfig = {
    @ActivationConfigProperty(propertyName = "acknowledgeMode", propertyValue = "Auto-acknowledge"),
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue")
})
public class WorkerBean implements MessageListener {
    
    public WorkerBean() {
    }
    
    @Override
    public void onMessage(Message message) {
        try {
            System.out.println("Received Message ");
            Thread.sleep(10000);
            System.out.println("Received Message Done ");
        } catch (InterruptedException ex) {
            Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
