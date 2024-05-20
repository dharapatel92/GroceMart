package com.groceMart.dto;

import java.util.Map;

public class CreateOrUpdateOrderRequest {

    private Long orderId;

    private Long userId;

    private Map<Long, Integer> productIdAndQuantityMap;

    public CreateOrUpdateOrderRequest(Long orderId, Long userId, Map<Long, Integer> productIdAndQuantityMap) {
        this.orderId = orderId;
        this.userId = userId;
        this.productIdAndQuantityMap = productIdAndQuantityMap;
    }

    public CreateOrUpdateOrderRequest() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Map<Long, Integer> getProductIdAndQuantityMap() {
        return productIdAndQuantityMap;
    }

    public void setProductIdAndQuantityMap(Map<Long, Integer> productIdAndQuantityMap) {
        this.productIdAndQuantityMap = productIdAndQuantityMap;
    }
}
