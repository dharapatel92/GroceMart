package com.groceMart.rest;

import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.service.UserService;
import com.groceMart.utils.Constants;
import com.groceMart.utils.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/")
public class AdminCrontroller {

    @Autowired
    private UserService userService;

    @PutMapping("/active/vendor/{userId}")
    public ResponseDTO activeVendor(@PathVariable Long userId) {

        LoggerUtil.logInfo("Entered into login");
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO = userService.activeVendor(userId);
        } catch (Exception e) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occured while login");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }


}
