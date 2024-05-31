package com.groceMart.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groceMart.dto.CategoryDTO;
import com.groceMart.dto.ProductDTO;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.dto.common.Role;
import com.groceMart.entity.Category;
import com.groceMart.entity.Product;
import com.groceMart.entity.User;
import com.groceMart.repository.CategoryRepository;
import com.groceMart.repository.UserRepository;
import com.groceMart.utils.Constants;
import java.util.List;
import java.util.ArrayList;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	UserRepository userRepository;
	public ResponseDTO addCategory(CategoryDTO caDto) {
		ResponseDTO responseDTO = new ResponseDTO();
        if (caDto == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request is null.");
            return responseDTO;
        }
        if (caDto.getCategoryName() == null || caDto.getCategoryName().isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Category Name is required");
            return responseDTO;
        }
        Optional<Category> optional = categoryRepository.findByCategoryName(caDto.getCategoryName());
        if (optional.isPresent()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Category is already Exist");
            return responseDTO;
        }
        Category category = new Category();
        category.setActive(true);
        category.setCategoryName(caDto.getCategoryName());
        category.setIsDelete(false);
        
        categoryRepository.save(category);
        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("Category added successfully");
        responseDTO.setData(CategoryDTO.build(category));
        return responseDTO;
        
	}

	public ResponseDTO getAllCategory() {
		ResponseDTO responseDTO = new ResponseDTO();
		List<CategoryDTO> list = new ArrayList<>();
		
		List<Category> categories = categoryRepository.findByIsDelete(false);
		for (Category category : categories) {
			CategoryDTO categoryDTO = (CategoryDTO) CategoryDTO.build(category);
			list.add(categoryDTO);
		}
		
		responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("Get All Category successfully");
        responseDTO.setData(list);
		
		return responseDTO;
	}

	public ResponseDTO deleteCategory(Long catId, Long userId) {
		
		ResponseDTO responseDTO = new ResponseDTO();
		
		Optional<User> userOptional =  userRepository.findById(userId);
		if(userOptional.isPresent()) {
			
			if(userOptional.get().getRoles().contains(Role.CUSTOMER)) {
				responseDTO.setSuccess(Constants.ERROR_CODE);
				responseDTO.setMessage("Access denied.!! Please try with valid user.");
				return responseDTO;
			}
			
		}else {
			responseDTO.setSuccess(Constants.ERROR_CODE);
			responseDTO.setMessage("User is not Found");
			return responseDTO;
		}
		
		Optional<Category> categoryOptional =   categoryRepository.findById(catId);
		if(categoryOptional.isPresent()) {
			categoryOptional.get().setIsDelete(true);
			categoryRepository.save(categoryOptional.get());
			
			responseDTO.setSuccess(Constants.SUCESS_CODE);
			responseDTO.setMessage("Category is deleted Sucessfully");
			
		}else {
			
			responseDTO.setSuccess(Constants.ERROR_CODE);
			responseDTO.setMessage("Category is not Found");
			return responseDTO;
		}
		
		return responseDTO;
	}

	public ResponseDTO updateCategory(CategoryDTO caDto) {
		ResponseDTO responseDTO = new ResponseDTO();
        if (caDto == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request is null.");
            return responseDTO;
        }
        if (caDto.getCategoryName() == null || caDto.getCategoryName().isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Category Name is required");
            return responseDTO;
        }
        Optional<Category> optional = categoryRepository.findById(caDto.getId());
        if (optional.isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Category is not Found");
            return responseDTO;
        }
        Category category = optional.get();
        category.setActive(caDto.isActive());
        category.setCategoryName(caDto.getCategoryName());
        category.setIsDelete(false);
        
        categoryRepository.save(category);
        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("Category updated successfully");
        responseDTO.setData(CategoryDTO.build(category));
        return responseDTO;
        
	}

}
	
