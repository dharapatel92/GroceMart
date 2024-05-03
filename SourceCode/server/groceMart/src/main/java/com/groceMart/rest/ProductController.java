package com.groceMart.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.groceMart.dto.CategoryDTO;
import com.groceMart.dto.UserDTO;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.service.CategoryService;
import com.groceMart.utils.Constants;
import com.groceMart.utils.LoggerUtil;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {
	
	@Autowired
	CategoryService categoryService;

	@PostMapping("/category")
    public ResponseDTO addCategory(@RequestBody CategoryDTO caDto) {
        LoggerUtil.logInfo("Entered into addCategory");
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            responseDTO = categoryService.addCategory(caDto);
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while add Category");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }
	
	@GetMapping("/AllCategory")
    public ResponseDTO getAllCategory() {
        LoggerUtil.logInfo("Entered into getAllCategory");
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            responseDTO = categoryService.getAllCategory();
        } catch (Exception e) {
            // Handling error case
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Error occurred while get all Category");
            LoggerUtil.logError(e.getMessage());
        }
        return responseDTO;
    }
}
