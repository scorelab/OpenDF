/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.messages;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.InitialContext;
import javax.naming.NamingException;

/**
 *
 * @author Acer
 */
public class WorkMessage {

    javax.jms.Queue destination;
    ConnectionFactory connectionFactory;

    public WorkMessage() {
        try {
            InitialContext init = new InitialContext();
            destination = (javax.jms.Queue) init.lookup("jms/Work");
            connectionFactory = (ConnectionFactory) init.lookup("jms/WorkFactory");
        } catch (NamingException ex) {
            Logger.getLogger(WorkMessage.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void send(String msg) {
        try {
            Connection connection = connectionFactory.createConnection();
            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            TextMessage message = session.createTextMessage();
            message.setText(msg);
            connection.start();
            MessageProducer producer = session.createProducer(destination);
            producer.setDeliveryMode(DeliveryMode.PERSISTENT);
            producer.send(message);
            
            System.out.println("Sent");

            producer.close();
            session.close();
            connection.close();
        } catch (JMSException ex) {
            Logger.getLogger(WorkMessage.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
