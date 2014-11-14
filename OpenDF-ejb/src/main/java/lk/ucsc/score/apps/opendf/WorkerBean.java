/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.opendf;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage; 
import org.sleuthkit.datamodel.AbstractFile;
import org.sleuthkit.datamodel.Content;
import org.sleuthkit.datamodel.Image;
import org.sleuthkit.datamodel.SleuthkitCase;
import org.sleuthkit.datamodel.SleuthkitJNI.CaseDbHandle.AddImageProcess;
import org.sleuthkit.datamodel.TskCoreException;
import org.sleuthkit.datamodel.TskDataException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
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
            TextMessage tm = (TextMessage)message;
            System.out.println(message.getJMSMessageID());
            System.out.println(tm.getText()); 
            //System.out.println(System.getProperty("os.arch"));
            //System.out.println(System.getProperty("java.io.tmpdir"));
            String imagePath = "/uploads/Cfreds001A001.dd";
           try{
              SleuthkitCase sk = SleuthkitCase.newCase(imagePath + ".db");
                System.out.println("initialize the case with an image");
                // initialize the case with an image
                BufferedReader br = null;
 
		try {
 
			String sCurrentLine;
 
			br = new BufferedReader(new FileReader(imagePath));
 
			while ((sCurrentLine = br.readLine()) != null) {
				System.out.println(sCurrentLine);
			}
 
		} catch (IOException e) {
			e.printStackTrace();
		}
                String timezone = "";
                //AddImageProcess process = sk.makeAddImageProcess(timezone, true, false);
//                ArrayList<String> paths = new ArrayList<String>();
//                paths.add(imagePath);
//                process.run(paths.toArray(new String[paths.size()]));
//                process.commit();
//            } catch (TskDataException ex) {
//                    Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
            } catch (Exception ex) {
                    Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
            }
            
            Thread.sleep(10000);
            System.out.println("Received Message Done ");
        } catch (JMSException ex) {
            Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InterruptedException ex) {
            Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
