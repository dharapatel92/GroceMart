package com.groceMart.dto;

public class AddCartRequest {

	private Long userId;
	private Long productId;
	private Integer qty;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Integer getQty() {
		return qty;
	}
	public void setQty(Integer qty) {
		this.qty = qty;
	}
	@Override
	public String toString() {
		return "AddCartRequest [userId=" + userId + ", productId=" + productId + ", qty=" + qty + "]";
	}
	
	
}
