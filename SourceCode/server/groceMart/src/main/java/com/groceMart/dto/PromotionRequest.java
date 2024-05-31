package com.groceMart.dto;

public class PromotionRequest {
	
	private Long userId;
	private Float disPercentage;
	private Long productId;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Float getDisPercentage() {
		return disPercentage;
	}
	public void setDisPercentage(Float disPercentage) {
		this.disPercentage = disPercentage;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	
	
	

}
