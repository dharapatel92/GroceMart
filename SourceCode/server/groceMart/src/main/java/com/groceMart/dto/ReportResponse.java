package com.groceMart.dto;

import com.groceMart.dto.common.OrderStatus;

import java.util.Map;

public class ReportResponse {

    private Long userId;
    private Integer year;
    private OrderStatus status;
    private Map<String, Double> reportData;

    public ReportResponse() {
    }

    public ReportResponse(Long userId, Integer year, OrderStatus status, Map<String, Double> reportData) {
        this.userId = userId;
        this.year = year;
        this.status = status;
        this.reportData = reportData;
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

    public Map<String, Double> getReportData() {
        return reportData;
    }

    public void setReportData(Map<String, Double> reportData) {
        this.reportData = reportData;
    }
}
