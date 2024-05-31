package com.groceMart.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.groceMart.dto.CategoryDTO;
import com.groceMart.dto.PromotionRequest;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.service.CategoryService;
import com.groceMart.service.ProductService;
import com.groceMart.utils.Constants;
import com.groceMart.utils.LoggerUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	ProductService productService;
	
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
	 
		@RequestMapping(value = "/product", method = RequestMethod.POST,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json")
		public ResponseDTO addProduct(HttpServletRequest request) {
			ResponseDTO responseDTO = new ResponseDTO();
			  try { 
				  LoggerUtil.logInfo("Entering into add product method.");
				  
				  MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
				  MultipartFile imageFile = multipartRequest.getFile("imageFile");
				  Long userId = Long.parseLong(multipartRequest.getParameter("userId").toString());
				  String productDTOJson = multipartRequest.getParameter("productDTO"); 
				  responseDTO = productService.addProduct(userId,productDTOJson,imageFile);
				 			  
			  }	  
			  catch (Exception e) { 
				  responseDTO.setSuccess(Constants.ERROR_CODE);
				  responseDTO.setMessage(e.getMessage());
				  LoggerUtil.logError("Error occured while adding product : "+e.getMessage());
			  } 
			  return responseDTO;
		}
		
		@GetMapping("/productbyCategory")
		public ResponseDTO getProductByCat(@RequestParam(required = false) Long catId) {
			ResponseDTO responseDTO = new ResponseDTO();
			  try { 
				  LoggerUtil.logInfo("Entering into getProductByCat.");
				  responseDTO = productService.getProductByCat(catId);
	 			  
			  }	  
			  catch (Exception e) { 
				  responseDTO.setSuccess(Constants.ERROR_CODE);
				  responseDTO.setMessage(e.getMessage());
				  LoggerUtil.logError("Error occured while getProductByCat: "+e.getMessage());
			  } 
			  return responseDTO;
		}
	 
		@GetMapping("/product")
		public ResponseDTO getProductById(Long productId) {
			ResponseDTO responseDTO = new ResponseDTO();
			  try { 
				  LoggerUtil.logInfo("Entering into getProductById.");
				  responseDTO = productService.getProductById(productId);
	 			  
			  }	  
			  catch (Exception e) { 
				  responseDTO.setSuccess(Constants.ERROR_CODE);
				  responseDTO.setMessage(e.getMessage());
				  LoggerUtil.logError("Error occured while getProductById: "+e.getMessage());
			  } 
			  return responseDTO;
		}
		
		
		@RequestMapping(value = "/product", method = RequestMethod.PUT,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json")
		public ResponseDTO updateProduct(HttpServletRequest request) {
			ResponseDTO responseDTO = new ResponseDTO();
			  try { 
				  LoggerUtil.logInfo("Entering into update product method.");
				  
				  MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
				  MultipartFile imageFile = multipartRequest.getFile("imageFile");
				  Long userId = Long.parseLong(multipartRequest.getParameter("userId").toString());
				  String productDTOJson = multipartRequest.getParameter("productDTO"); 
				  responseDTO = productService.updateProduct(userId,productDTOJson,imageFile);
				 			  
			  }	  
			  catch (Exception e) { 
				  responseDTO.setSuccess(Constants.ERROR_CODE);
				  responseDTO.setMessage(e.getMessage());
				  LoggerUtil.logError("Error occured while update product : "+e.getMessage());
			  } 
			  return responseDTO;
		}
		
		 @DeleteMapping("/product/{productId}/{userId}")
		    public ResponseDTO deleteProduct(@PathVariable Long productId,@PathVariable Long userId) {
		        LoggerUtil.logInfo("Entered into delete Product");
		        ResponseDTO responseDTO = new ResponseDTO();
		        try {
		            responseDTO = productService.deleteProduct(productId,userId);
		        } catch (Exception e) {
		            // Handling error case
		            responseDTO.setSuccess(Constants.ERROR_CODE);
		            responseDTO.setMessage("Error occurred while delete Product");
		            LoggerUtil.logError(e.getMessage());
		        }
		        return responseDTO;
		    }
		 
		 @DeleteMapping("/category/{catId}/{userId}")
		    public ResponseDTO deleteCategory(@PathVariable Long catId,@PathVariable Long userId) {
		        LoggerUtil.logInfo("Entered into delete Category");
		        ResponseDTO responseDTO = new ResponseDTO();
		        try {
		            responseDTO = categoryService.deleteCategory(catId,userId);
		        } catch (Exception e) {
		            // Handling error case
		            responseDTO.setSuccess(Constants.ERROR_CODE);
		            responseDTO.setMessage("Error occurred while delete Category");
		            LoggerUtil.logError(e.getMessage());
		        }
		        return responseDTO;
		    }
		 
		 @PutMapping("/category")
		    public ResponseDTO updateCategory(@RequestBody CategoryDTO caDto) {
		        LoggerUtil.logInfo("Entered into update Category");
		        ResponseDTO responseDTO = new ResponseDTO();

		        try {
		            responseDTO = categoryService.updateCategory(caDto);
		        } catch (Exception e) {
		            // Handling error case
		            responseDTO.setSuccess(Constants.ERROR_CODE);
		            responseDTO.setMessage("Error occurred while update Category");
		            LoggerUtil.logError(e.getMessage());
		        }
		        return responseDTO;
		    }
		 
		 @PostMapping("/promotion")
		    public ResponseDTO promotion(@RequestBody PromotionRequest promotionRequest) {
		        LoggerUtil.logInfo("Entered into promotion");
		        ResponseDTO responseDTO = new ResponseDTO();

		        try {
		            responseDTO = productService.promotion(promotionRequest);
		        } catch (Exception e) {
		            // Handling error case
		            responseDTO.setSuccess(Constants.ERROR_CODE);
		            responseDTO.setMessage("Error occurred while Add/Update promotion");
		            LoggerUtil.logError(e.getMessage());
		        }
		        return responseDTO;
		    }
}
