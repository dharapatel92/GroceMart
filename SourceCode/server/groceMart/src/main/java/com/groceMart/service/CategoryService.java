package com.groceMart.service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groceMart.dto.CategoryDTO;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.entity.Category;
import com.groceMart.repository.CategoryRepository;
import com.groceMart.utils.Constants;
import java.util.List;
import java.util.ArrayList;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
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
        
        categoryRepository.save(category);
        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("Category added successfully");
        responseDTO.setData(CategoryDTO.build(category));
        return responseDTO;
        
	}

	public ResponseDTO getAllCategory() {
		ResponseDTO responseDTO = new ResponseDTO();
		List<CategoryDTO> list = new ArrayList<>();
		
		List<Category> categories = categoryRepository.findAll();
		for (Category category : categories) {
			CategoryDTO categoryDTO = (CategoryDTO) CategoryDTO.build(category);
			list.add(categoryDTO);
		}
		
		responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("Get All Category successfully");
        responseDTO.setData(list);
		
		return responseDTO;
	}

	
}
