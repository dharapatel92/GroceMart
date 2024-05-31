package com.groceMart.dto;

import com.groceMart.entity.Category;

public class CategoryDTO {

	private Long id;
    private String categoryName;
    private boolean isActive;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	@Override
	public String toString() {
		return "CategoryDTO [id=" + id + ", categoryName=" + categoryName + ", isActive=" + isActive + "]";
	}
	public static Object build(Category category) {
		CategoryDTO categoryDTO = new CategoryDTO();
		
		categoryDTO.setId(category.getId());
		categoryDTO.setCategoryName(category.getCategoryName());
		categoryDTO.setActive(category.isActive());
		return categoryDTO;
	}
	
    
    
}
