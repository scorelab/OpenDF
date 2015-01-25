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
import org.sleuthkit.datamodel.File;
import org.sleuthkit.datamodel.Volume;
import org.sleuthkit.datamodel.Image;
import org.sleuthkit.datamodel.SleuthkitCase;
import org.sleuthkit.datamodel.SleuthkitJNI.CaseDbHandle.AddImageProcess;
import org.sleuthkit.datamodel.TskCoreException;
import org.sleuthkit.datamodel.TskDataException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;
import javax.persistence.TypedQuery;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.commons.lang3.StringEscapeUtils;

/**
 *
 * @author Acer
 */

@MessageDriven(mappedName = "jms/Work", activationConfig = {
    @ActivationConfigProperty(propertyName = "acknowledgeMode", propertyValue = "Auto-acknowledge"),
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue")
})
public class WorkerBean implements MessageListener {
    DataSource db;
    public WorkerBean() {
        try { 
            InitialContext ic = new InitialContext();
            String snName = "OpenDF";
            db = (javax.sql.DataSource)ic.lookup(snName);
        }
        catch (Exception e) {
          System.out.println(e);
        }
        
    }
    
    @Override
    public void onMessage(Message message) {
//        EntityManager em = emf.createEntityManager();
//        TypedQuery<String> query = em.createQuery("SELECT d.path FROM Diskimage d WHERE idDiskImage = 1", String.class);
//        String path = query.getSingleResult();
            
        try {
            Connection connection = db.getConnection();
            Statement stmt = connection.createStatement();
            
            System.out.println("Received Message ");
            TextMessage tm = (TextMessage)message;
            System.out.println(message.getJMSMessageID()+":"+tm.getText());
            //
            String[] action = tm.getText().split(" "); 
            String DiskImage = action[1];
            String sql = "SELECT * FROM diskimage WHERE idDiskImage= "+DiskImage;System.out.println(sql);
            ResultSet rs = stmt.executeQuery(sql);
            String path = "";
            while(rs.next()){
                path = rs.getString("path");
            }
           

            String imagePath = "uploads/"+path;
            try{
                SleuthkitCase sk = SleuthkitCase.newCase(imagePath + ".db");
                System.out.println("initialize the case with an image");
                

                String timezone = "";
                AddImageProcess process = sk.makeAddImageProcess(timezone, true, false);
                ArrayList<String> paths = new ArrayList<String>();
                paths.add(imagePath);
                try {
                        process.run(paths.toArray(new String[paths.size()]));
                } catch (TskDataException ex) {

                }
                process.commit();
                

                
                // print out all the images found, and their children
                List<Image> images = sk.getImages();
                for (Image image : images) {
                        System.out.println("Found image: " + image.getName());
                        System.out.println("There are " + image.getChildren().size() + " children.");
                        for (Content content : image.getChildren()) {
                                System.out.println('"' + content.getName() + '"' + " is a child of " + image.getName());
                                traverse(content, connection, -1, DiskImage);
                        }	
                }	

                // print out all .txt files found
                List<AbstractFile> files = sk.findAllFilesWhere("name like '%.txt'");
                for (AbstractFile file : files) {
                        System.out.println("Found text file: " + file.getName());
                }
		sk.close();
		} catch (TskCoreException e) {
			System.out.println("Exception caught: " + e.getMessage());
			
		}
            
            Thread.sleep(10000);
            System.out.println("Received Message Done ");
        } catch (JMSException ex) {
            Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InterruptedException ex) {
            Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
        }catch (Exception ex) {
            Logger.getLogger(WorkerBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void traverse(Content content, Connection connection, int parent, String diskImage) throws TskCoreException,  SQLException{		
        for (Content cnt : content.getChildren()) {
            
            int idDirectory = -1;
            if (cnt instanceof File){
                File c = (File)cnt;
                //System.out.println("Name:"+c.getName());
                //System.out.println("Parent idFile:"+parent);

                Statement stmt = connection.createStatement();
                if(!".".equals(c.getName()) && !"..".equals(c.getName())){
                    System.out.println("INSERT INTO file( name, size, MIMEtype, createdDate,UpdatedDate, AccessDate, md5hash, extension, isVirtual, isDir, diskimage_idDiskImage, parent_idFile) VALUES ( '"+StringEscapeUtils.escapeEcmaScript(c.getName())+"', "+c.getSize()+", '"+c.getType().toString()+"', FROM_UNIXTIME("+c.getCrtime()+"), FROM_UNIXTIME("+c.getMtime()+"), FROM_UNIXTIME("+c.getAtime()+"), '"
                    +c.getMd5Hash()+"', '', "
                    +c.isVirtual()+",  "+c.isDir()+",  "+diskImage+","+parent+")");
                    stmt.executeUpdate("INSERT INTO file( name, size, MIMEtype, createdDate,UpdatedDate, AccessDate, md5hash, extension, isVirtual, isDir, diskimage_idDiskImage, parent_idFile) VALUES ( '"+StringEscapeUtils.escapeEcmaScript(c.getName())+"', "+c.getSize()+", '"+c.getType().toString()+"', FROM_UNIXTIME("+c.getCrtime()+"), FROM_UNIXTIME("+c.getMtime()+"), FROM_UNIXTIME("+c.getAtime()+"), '"
                    +c.getMd5Hash()+"', '', "
                    +c.isVirtual()+",  "+c.isDir()+",  "+diskImage+","+parent+")", Statement.RETURN_GENERATED_KEYS);
                    ResultSet rs = stmt.getGeneratedKeys();
                    while (rs.next()) {
                        idDirectory = rs.getInt(1);
                        System.out.println("idDirectory: "+idDirectory);
                    } 
                    rs.close();
                }
           } else{
                
                Content c = cnt;
                //System.out.println("Name:"+c.getName());
                //System.out.println("Parent idFile:"+parent);

                Statement stmt = connection.createStatement();
                if(!".".equals(c.getName()) && !"..".equals(c.getName())){
                    System.out.println("INSERT INTO file ( name, size, diskimage_idDiskImage, parent_idFile, isDir) VALUES ( '"+StringEscapeUtils.escapeEcmaScript(c.getName())+"', "+c.getSize()+",  "+diskImage+","+parent+", 1)");
                    stmt.executeUpdate("INSERT INTO file ( name, size, diskimage_idDiskImage, parent_idFile, isDir) VALUES ( '"+StringEscapeUtils.escapeEcmaScript(c.getName())+"', "+c.getSize()+",  "+diskImage+","+parent+", 1)", Statement.RETURN_GENERATED_KEYS);
                    ResultSet rs = stmt.getGeneratedKeys();
                    while (rs.next()) {
                        idDirectory = rs.getInt(1);
                        System.out.println("idDirectory: "+idDirectory);
                    } 
                    rs.close();
                }
           }
           System.out.println(">" + cnt.getName() + "["+idDirectory+"]" + " is a child of " + content.getName()+ "["+parent+"]"  );
           traverse(cnt, connection, idDirectory, diskImage );
        }
    }
}
