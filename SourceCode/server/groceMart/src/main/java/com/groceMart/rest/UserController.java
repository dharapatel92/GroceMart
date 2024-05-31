package com.groceMart.rest;

import com.groceMart.dto.ChangePasswordRequest;
import com.groceMart.dto.LoginRequest;
import com.groceMart.dto.UserDTO;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.service.UserService;
import com.groceMart.utils.Constants;
import com.groceMart.utils.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/welcome")
    public ResponseDTO test() {

        LoggerUtil.logInfo("Entered into login");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Welcome to the GroceMart..");

        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while login");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @PostMapping("/users/register")
    public ResponseDTO registerUser(@RequestBody UserDTO userDTO) {
        LoggerUtil.logInfo("Entered into registration");
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            responseDTO = userService.registerUser(userDTO);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while registering user");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @PostMapping("/users/update")
    public ResponseDTO updateUser(@RequestBody UserDTO userDTO) {
        LoggerUtil.logInfo("Entered into user update");
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            responseDTO = userService.updateUser(userDTO);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while updating user");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @PostMapping("/users/change-password")
    public ResponseDTO changePassword(@RequestBody ChangePasswordRequest request) {
        LoggerUtil.logInfo("Entered into changePassword");
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            responseDTO = userService.changePassword(request);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while change password");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @PostMapping("/users/login")
    public ResponseDTO login(@RequestBody LoginRequest request) {
        LoggerUtil.logInfo("Entered into login");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = userService.login(request);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while login user");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }


    @GetMapping("/users/forgotPassword")
    public ResponseDTO forgotPassword(@RequestParam String email) {
        LoggerUtil.logInfo("Entered into forgotPassword");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = userService.forgotPassword(email);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while forgot Password");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @PostMapping("/users/resetPassword")
    public ResponseDTO resetPassword(@RequestParam String email, @RequestParam String code, @RequestParam String password) {
        LoggerUtil.logInfo("Entered into resetPassword");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = userService.resetPassword(email, code, password);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while reset Password");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @GetMapping("/users/{userId}")
    public ResponseDTO getUserDetails(@PathVariable Long userId) {
        LoggerUtil.logInfo("Entered into getUserDetails");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = userService.getUserDetails(userId);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while getUserDetails");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }

    @GetMapping("/users")
    public ResponseDTO getAllUsers() {
        LoggerUtil.logInfo("Entered into getAllUsers");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = userService.getAllUsers();
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while getAllUsers");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }
}
