package com.groceMart.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.groceMart.dto.common.EmailDetails;

import jakarta.mail.internet.MimeMessage;

@Component
public class EmailUtil {

	 
    @Value("${spring.mail.username}") 
    private String sender;
    
    @Autowired
    private JavaMailSender mailSender;
    
	public void sendEMail(EmailDetails details) {
		LoggerUtil.logInfo("Entered into sendEMail");

		 try {
			 
			 MimeMessage message = mailSender.createMimeMessage();
			 MimeMessageHelper helper = new MimeMessageHelper(message);
	 
			 helper.setFrom(sender);
			 helper.setTo(details.getRecipient());

			 helper.setSubject(details.getSubject());
			 helper.setText(details.getMsgBody(), true);

			 mailSender.send(message);
			 
			 LoggerUtil.logInfo("Email sent");  
	        }
	 
	        // Catch block to handle the exceptions
	        catch (Exception e) {
	           e.printStackTrace();
	           LoggerUtil.logError("Eror occured while send email"+e.getMessage());
	        }
	}
}
