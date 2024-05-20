package com.groceMart.dto;

import com.groceMart.entity.OrderDetails;

import java.util.ArrayList;
import java.util.List;

public class OrderDetailsDTO {


    private Long id;
    private ProductDTO product;

    private int quantity;

    public OrderDetailsDTO(Long id, ProductDTO product, int quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }

    public OrderDetailsDTO() {
    }

    public static List<OrderDetailsDTO> build(List<OrderDetails> orderDetails) {
        List<OrderDetailsDTO> list = new ArrayList<>();
        orderDetails.forEach(od -> {
        	if(od.getQuantity() > 0) {
	        	OrderDetailsDTO orderDetailsDTO = new OrderDetailsDTO();
	            orderDetailsDTO.setId(od.getId());
	            orderDetailsDTO.setProduct(ProductDTO.build(od.getProduct()));
	            orderDetailsDTO.setQuantity(od.getQuantity());
	            list.add(orderDetailsDTO);
        	}
        });
        return list;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
