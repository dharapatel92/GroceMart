package com.groceMart.repository;

import com.groceMart.dto.common.OrderStatus;
import com.groceMart.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByIdAndStatusAndUserIdAndIsDeleteFalse(Long orderId, OrderStatus status, Long userId);

    Order findByIdAndUserIdAndIsDeleteFalse(Long orderId, Long userId);

    List<Order> findAllByStatusAndUserIdAndIsDeleteFalse(OrderStatus status, Long userId);

    List<Order> findAllByUserIdAndIsDeleteFalse(Long userId);

    Optional<Order> findByStatusAndUserIdAndIsDeleteFalse(OrderStatus inCart, Long userId);

    @Query("SELECT o FROM Order o WHERE o.status = :status AND FUNCTION('YEAR', o.orderDate) = :year")
    List<Order> findByStatusAndYear(@Param("status") OrderStatus status, @Param("year") int year);

	
	@Query(value= "SELECT * FROM orders WHERE is_delete=false AND DATE_FORMAT(order_date,'%Y-%m-%d') = DATE_FORMAT(:date,'%Y-%m-%d')", nativeQuery = true)
	List<Order> findByOrderDate( @Param("date") String date);
	
	List<Order> findByStatus(OrderStatus status);
}
