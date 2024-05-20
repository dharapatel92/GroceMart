package com.groceMart.dto;

import com.groceMart.dto.common.OrderStatus;
import com.groceMart.entity.Order;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class OrderDTO {

    private Long orderId;

    private Double amount;

    private List<OrderDetailsDTO> orderDetailsDTOList;

    private Long userId;

    private Integer totalqty;
    
    private OrderStatus status;

    public OrderDTO() {
    }

   

    public OrderDTO(Long orderId, Double amount, List<OrderDetailsDTO> orderDetailsDTOList, Long userId,
			Integer totalqty, OrderStatus status) {
		super();
		this.orderId = orderId;
		this.amount = amount;
		this.orderDetailsDTOList = orderDetailsDTOList;
		this.userId = userId;
		this.totalqty = totalqty;
		this.status = status;
	}



	public static OrderDTO build(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getId());
        orderDTO.setAmount(order.getTotalAmount());
        orderDTO.setOrderDetailsDTOList(OrderDetailsDTO.build(order.getOrderDetails()));
        orderDTO.setUserId(order.getUser().getId());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotalqty(order.getTotalqty());
        return orderDTO;
    }

    public static List<OrderDTO> build(List<Order> orders) {
        return orders.stream().filter(Objects::nonNull).map(OrderDTO::build).collect(Collectors.toList());
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public List<OrderDetailsDTO> getOrderDetailsDTOList() {
        return orderDetailsDTOList;
    }

    public void setOrderDetailsDTOList(List<OrderDetailsDTO> orderDetailsDTOList) {
        this.orderDetailsDTOList = orderDetailsDTOList;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }



	public Integer getTotalqty() {
		return totalqty;
	}



	public void setTotalqty(Integer totalqty) {
		this.totalqty = totalqty;
	}
    
    
}
