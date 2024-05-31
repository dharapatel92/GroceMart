package com.groceMart.repository;

import com.groceMart.dto.common.OrderStatus;
import com.groceMart.entity.Order;
import com.groceMart.entity.OrderDetails;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {

    void deleteByOrderId(Long orderId);

    
}
