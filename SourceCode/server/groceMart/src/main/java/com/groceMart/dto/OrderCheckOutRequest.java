package com.groceMart.dto;

public class OrderCheckOutRequest {

	private Long orderId;
	
	private String fName;
	private String lName;
	private String address;
	private String address1;
	private String code;
	private String city;
	private String cardHolderName;
	private String cardNo;
	private String cardExp;
	private String cardCVV;
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public String getfName() {
		return fName;
	}
	public void setfName(String fName) {
		this.fName = fName;
	}
	public String getlName() {
		return lName;
	}
	public void setlName(String lName) {
		this.lName = lName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCardHolderName() {
		return cardHolderName;
	}
	public void setCardHolderName(String cardHolderName) {
		this.cardHolderName = cardHolderName;
	}
	public String getCardNo() {
		return cardNo;
	}
	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}
	public String getCardExp() {
		return cardExp;
	}
	public void setCardExp(String cardExp) {
		this.cardExp = cardExp;
	}
	public String getCardCVV() {
		return cardCVV;
	}
	public void setCardCVV(String cardCVV) {
		this.cardCVV = cardCVV;
	}
	@Override
	public String toString() {
		return "OrderCheckOutRequest [orderId=" + orderId + ", fName=" + fName + ", lName=" + lName + ", address="
				+ address + ", address1=" + address1 + ", code=" + code + ", city=" + city + ", cardHolderName="
				+ cardHolderName + ", cardNo=" + cardNo + ", cardExp=" + cardExp + ", cardCVV=" + cardCVV + "]";
	}
	
	
}
