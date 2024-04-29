package com.groceMart.service;

import com.groceMart.dto.ChangePasswordRequest;
import com.groceMart.dto.LoginRequest;
import com.groceMart.dto.UserDTO;
import com.groceMart.dto.common.EmailDetails;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.dto.common.Role;
import com.groceMart.entity.User;
import com.groceMart.repository.UserRepository;
import com.groceMart.utils.CommonUtil;
import com.groceMart.utils.Constants;
import com.groceMart.utils.EmailUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Pattern;

@Service
public class UserService {
    private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    EmailUtil emailUtil;

    public ResponseDTO registerUser(UserDTO request) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (request == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request is null.");
            return responseDTO;
        }
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Email is required");
            return responseDTO;
        }
        if (!isValidEmail(request.getEmail())) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Email is not in valid format.");
            return responseDTO;
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Email is already registered.");
            return responseDTO;
        }
        String hashedPassword = CommonUtil.encodePassword(request.getPassword());
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setContact(request.getContact());
        if (request.getRoles().contains(Role.VENDOR)) {
            user.setActive(false);
        } else {
            user.setActive(true); // Assuming new users are active by default
        }
        user.setRoles(request.getRoles());
        // Save the user entity
        userRepository.save(user);
        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("User registered successfully");
        responseDTO.setData(UserDTO.build(user));
        return responseDTO;

    }

    public ResponseDTO updateUser(UserDTO request) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (request == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request is null.");
            return responseDTO;
        }
        Optional<User> optionalUser = userRepository.findById(request.getId());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setContact(request.getContact());

            userRepository.save(user);
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("User updated successfully");
            responseDTO.setData(UserDTO.build(user));
        } else {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User Not found with Id: " + request.getId());
            return responseDTO;
        }
        return responseDTO;

    }

    public ResponseDTO changePassword(ChangePasswordRequest request) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (request == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request is null.");
            return responseDTO;
        }
        Optional<User> optionalUser = userRepository.findById(request.getUserId());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String currentPassword = CommonUtil.encodePassword(request.getCurrentPassword());
            if (user.getPassword().equals(currentPassword)) {
                String hashedPassword = CommonUtil.encodePassword(request.getNewPassword());
                user.setPassword(hashedPassword);
                userRepository.save(user);
                responseDTO.setSuccess(Constants.SUCESS_CODE);
                responseDTO.setMessage("User updated successfully");

            } else {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("User Current password not matched.");
                return responseDTO;
            }
        } else {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User Not found with Id: " + request.getUserId());
            return responseDTO;
        }

        return responseDTO;

    }

    public ResponseDTO login(LoginRequest request) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (request == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request is null.");
            return responseDTO;
        }
        Optional<User>  user = userRepository.findByEmail(request.getEmail());
        if (user.isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User not found with email: " + request.getEmail());
            return responseDTO;
        }
        String currentPassword = CommonUtil.decodePassword(user.get().getPassword());
        if (currentPassword.equals(request.getPassword())) {
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("User login successfully");
            responseDTO.setData(UserDTO.build(user.get()));
        } else {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User password not matched.");
            return responseDTO;
        }
        return responseDTO;
    }

    private boolean isValidEmail(String email) {
        return pattern.matcher(email).matches();
    }

    public ResponseDTO activeVendor(Long userId) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (userId == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("UserId is null in request.");
            return responseDTO;
        }
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getRoles().contains(Role.CUSTOMER)) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Customer not need approval it's already active.");
                return responseDTO;
            }
            if (user.isActive()) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Vendor is already active.");
                return responseDTO;
            } else {
                user.setActive(true);
                userRepository.save(user);
                responseDTO.setSuccess(Constants.SUCESS_CODE);
                responseDTO.setMessage("Vendor is active now.");
            }
        } else {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Vendor Not found with Id: " + userId);
            return responseDTO;
        }
        return responseDTO;
    }

	public ResponseDTO forgotPassword(String email) {
		ResponseDTO responseDTO = new ResponseDTO();
        if (email == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Email is required");
            return responseDTO;
        }
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
        	
        	Random rand = new Random();
        	Integer code = rand.nextInt(10000);
        	EmailDetails details = new EmailDetails();

        	StringBuilder htmlContent = new StringBuilder();
    		htmlContent.append("<p style='text-transform:capitalize'>Hi " + optionalUser.get().getFirstName() + ", </p><br/>");
    		htmlContent.append("<p>We received a request to change your password, we are happy to help!</p>");
    		htmlContent.append("<p>Here is the code to change your password!</p>");
    		htmlContent.append("<p>Code : "+code+ "</p><br/>");
    		htmlContent.append("<p>Regards,</p>");
    		htmlContent.append("<p>Groce Mart Team</p>");

        	
        	details.setSubject("Forgot Password");
        	details.setRecipient(optionalUser.get().getEmail());
        	details.setMsgBody(htmlContent.toString());
        	// send email
        	emailUtil.sendEMail(details);
        	
        	Calendar date = Calendar.getInstance();
        	date.add(Calendar.MINUTE, 15);
        	optionalUser.get().setForgotCode(code.toString());
        	
        	optionalUser.get().setExpiry(CommonUtil.converterDateToString(date));
        	userRepository.save(optionalUser.get());
        
        	// set response
        	responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Forgot Password successfully");
            return responseDTO;
        	
        	
        }else {
        	
        	 responseDTO.setSuccess(Constants.ERROR_CODE);
             responseDTO.setMessage("User is not found..!");
             return responseDTO;
        }
	}

	public ResponseDTO resetPassword(String email, String code, String password) {
		ResponseDTO responseDTO = new ResponseDTO();
        if (email == null || code == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Email and code are required");
            return responseDTO;
        }
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
        	
        	if(optionalUser.get().getForgotCode().equals(code)) {
        		
        		Calendar currentDate = Calendar.getInstance();
        		System.out.println(CommonUtil.converterDateToString(currentDate));
            	Calendar date = CommonUtil.converterStringToDate(optionalUser.get().getExpiry());
            	System.out.println(CommonUtil.converterDateToString(date));
            	if(currentDate.after(date)) {
            	
            		responseDTO.setSuccess(Constants.ERROR_CODE);
                    responseDTO.setMessage("Code is expired please try again..!");
                    return responseDTO;
            	}
            	
            	optionalUser.get().setPassword(CommonUtil.encodePassword(password));
            	optionalUser.get().setExpiry(null);
            	optionalUser.get().setForgotCode(null);
            	userRepository.save(optionalUser.get());
            
            	// set response
            	responseDTO.setSuccess(Constants.SUCESS_CODE);
                responseDTO.setMessage("Reset Password successfully");
                return responseDTO;
        	}else {
        		
        		responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Code is wrong..!");
                return responseDTO;
        	}
        	
        }else {
        	
        	 responseDTO.setSuccess(Constants.ERROR_CODE);
             responseDTO.setMessage("User is not found..!");
             return responseDTO;
        }
	}
}
