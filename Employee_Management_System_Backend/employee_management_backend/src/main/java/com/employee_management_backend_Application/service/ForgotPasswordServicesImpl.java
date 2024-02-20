package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.exception.ForgotPasswordOtpSendException;
import com.employee_management_backend_Application.repository.RegistrationRepository;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Properties;
import java.util.Random;
@Service
public class ForgotPasswordServicesImpl implements ForgotPassordService{
    @Autowired
    private RegistrationRepository registrationRepository;
   private Random random=new Random(1000);
    @Value("${server.email.Id}")
   private String from;
    @Override
    public ForgotPasswordResponse forgotPosswordOtpVerification(ForgotPasswordRequest forgotPasswordRequest) {
        if (registrationRepository.existsById(forgotPasswordRequest.getRegistrationEmail())) {
            Integer otpData = random.nextInt(99999);
            String subject = "OTP from Employee_Management_System";
            String message = "OTO: " + otpData;
            String to = forgotPasswordRequest.getRegistrationEmail();
            boolean flage = this.sendEmail(subject, message, to, from);
            if (flage) {
                ForgotPasswordResponse forgotPasswordResponse = new ForgotPasswordResponse();
                forgotPasswordResponse.setOtpFromServer(otpData);
                return forgotPasswordResponse;
            } else {
                throw new ForgotPasswordOtpSendException("Otp unable to send deu to Server Error");
            }
        } else {
            throw new ForgotPasswordOtpSendException("This Email Does not Exists in Database");

        }
    }



    public boolean sendEmail(String subject,String message,String to,String from)
    {
        boolean flage=false;
        String host="smtp.gmail.com";
        Properties properties=System.getProperties();
        properties.put("mail.smtp.auth",true);
        properties.put("mail.smtp.starttls.enable",true);
        properties.put("mail.smtp.host",host);
        properties.put("mail.smtp.port","587");


        String userName="electronics8499@gmail.com";
        String password="";
        Session session=Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(userName,password);
            }
        });
        Message mimeMessage=new MimeMessage(session);
        try
        {
            mimeMessage.setFrom(new InternetAddress(from));
            mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
            mimeMessage.setSubject(subject);
            mimeMessage.setText(message);
            Transport.send(mimeMessage);
            flage=true;

        }catch (Exception exception)
        {
            exception.printStackTrace();
        }
        return flage;

    }
}
