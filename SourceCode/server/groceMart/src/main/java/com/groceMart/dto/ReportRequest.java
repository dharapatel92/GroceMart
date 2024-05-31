package com.groceMart.dto;

import com.groceMart.dto.common.OrderStatus;

public class ReportRequest {

    private Long userId;
    private Integer year;
    private OrderStatus status;

    public ReportRequest() {
    }

    public ReportRequest(Long userId, Integer year, OrderStatus status) {
        this.userId = userId;
        this.year = year;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
