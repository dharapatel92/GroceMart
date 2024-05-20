package com.groceMart.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groceMart.dto.AddCartRequest;
import com.groceMart.dto.CreateOrUpdateOrderRequest;
import com.groceMart.dto.OrderDTO;
import com.groceMart.dto.common.OrderStatus;
import com.groceMart.dto.common.ResponseDTO;
import com.groceMart.entity.Order;
import com.groceMart.entity.OrderDetails;
import com.groceMart.entity.Product;
import com.groceMart.entity.User;
import com.groceMart.repository.OrderDetailsRepository;
import com.groceMart.repository.OrderRepository;
import com.groceMart.repository.ProductRepository;
import com.groceMart.repository.UserRepository;
import com.groceMart.utils.Constants;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    private List<OrderStatus> statusNotBeDelete = List.of(OrderStatus.CHECK_OUT, OrderStatus.COMPLETED, OrderStatus.CANCELLED);

    public ResponseDTO addToCart(CreateOrUpdateOrderRequest request) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (request == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Request can not be null.");
            return responseDTO;
        }

        if (request.getUserId() == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("UserId is null in request.");
            return responseDTO;
        }
        if (request.getProductIdAndQuantityMap().isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("ProductAndQuantity Map is null in request.");
            return responseDTO;
        }
        Optional<User> optionalUser = userRepository.findById(request.getUserId());

        if (optionalUser.isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("User Not found with Id: " + request.getUserId());
            return responseDTO;
        }

        if (request.getOrderId() != null) {
            Order order = orderRepository.findByIdAndUserIdAndIsDeleteFalse(request.getOrderId(), request.getUserId());
            if (order == null) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Order Not found with Id: " + request.getOrderId());
                return responseDTO;
            }
            order.setDelete(true);
            order.getOrderDetails().forEach(od -> {
                od.getProduct().setQty(od.getProduct().getQty() + od.getQuantity());
                od.setDelete(true);
                productRepository.save(od.getProduct());
            });
            orderRepository.save(order);

        }
        return createOrder(request, responseDTO, optionalUser);
    }

    private ResponseDTO createOrder(CreateOrUpdateOrderRequest request, ResponseDTO responseDTO, Optional<User> optionalUser) {
        Order order = new Order();
        order.setOrderDate(new Date());
        Double totalAmount = 0.0;
        List<OrderDetails> listOrderItem = new ArrayList<>();
        for (Map.Entry<Long, Integer> entry : request.getProductIdAndQuantityMap().entrySet()) {
            Long productId = entry.getKey();
            Integer quantity = entry.getValue();
            Product product = productRepository.findById(productId).orElse(null);

            if (product == null) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Product not found with id:-" + productId);
                return responseDTO;
            }

            if (product.getQty() < quantity) {
                responseDTO.setSuccess(Constants.ERROR_CODE);
                responseDTO.setMessage("Not enough stock for productId:-" + productId);
                return responseDTO;
            }
            Double orderItemPrice = product.getPrice() * quantity;
            totalAmount = totalAmount + orderItemPrice;
            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setProduct(product);
            orderDetails.setQuantity(quantity);
            orderDetails.setOrder(order);
            orderDetails.setAmount(product.getPrice());
            product.setQty(product.getQty() - quantity);
            productRepository.save(product);
            listOrderItem.add(orderDetails);
        }
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.In_CART);
        order.setUser(optionalUser.get());
        order.setOrderDetails(listOrderItem);
        order.setTotalqty(listOrderItem.get(0).getQuantity());

        orderRepository.save(order);
        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("Order created successfully.");
        responseDTO.setData(OrderDTO.build(order));
        return responseDTO;
    }

    public ResponseDTO updateOrderStatus(Long orderId, OrderStatus status) {
        ResponseDTO responseDTO = new ResponseDTO();

        if (orderId == null || status == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("OrderId or Status is null in request.");
            return responseDTO;
        }

        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Order not found with orderId:- " + orderId);
            return responseDTO;
        }
        Order dbOrder = order.get();
        if (dbOrder.getDelete()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Order is already deleted with id:- " + orderId);
            return responseDTO;
        }
        if (status.equals(OrderStatus.CANCELLED)) {
            dbOrder.getOrderDetails().forEach(p -> {
                p.getProduct().setQty(p.getProduct().getQty() + p.getQuantity());
                productRepository.save(p.getProduct());
            });
            dbOrder.setStatus(status);
        } else {
            dbOrder.setStatus(status);
        }

        orderRepository.save(dbOrder);
        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setMessage("OrderId :- " + orderId + "Status updated to :- " + status);
        return responseDTO;
    }

    public ResponseDTO getOrderById(Long orderId) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (orderId == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("OrderId is null in request.");
            return responseDTO;
        }

        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isEmpty()) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("Order not found with orderId:- " + orderId);
            return responseDTO;
        }
        Order dbOrder = order.get();

        responseDTO.setSuccess(Constants.SUCESS_CODE);
        responseDTO.setData(OrderDTO.build(dbOrder));
        responseDTO.setMessage("Order fetched successfully.");
        return responseDTO;
    }

    public ResponseDTO getOrderByIdAndStatus(Long orderId, OrderStatus status, Long userId) {
        ResponseDTO responseDTO = new ResponseDTO();
        if (userId == null) {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("UserId must be present in request.");
            return responseDTO;
        }

        if (orderId == null && status == null) {
            List<Order> orders = orderRepository.findAllByUserIdAndIsDeleteFalse(userId);
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Orders fetched success.");
            responseDTO.setData(OrderDTO.build(orders));
            return responseDTO;
        } else if (orderId != null) {
            Order order = orderRepository.findByIdAndUserIdAndIsDeleteFalse(orderId, userId);
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Order fetched success.");
            responseDTO.setData(OrderDTO.build(order));
            return responseDTO;
        } else if (orderId == null && status != null) {
            List<Order> orders = orderRepository.findAllByStatusAndUserIdAndIsDeleteFalse(status, userId);
            responseDTO.setSuccess(Constants.SUCESS_CODE);
            responseDTO.setMessage("Orders fetched success.");
            responseDTO.setData(OrderDTO.build(orders));
            return responseDTO;
        } else {
            responseDTO.setSuccess(Constants.ERROR_CODE);
            responseDTO.setMessage("No records found for inputs.");
            return responseDTO;
        }
    }

    public ResponseDTO addToCart(AddCartRequest request) {
		  ResponseDTO responseDTO = new ResponseDTO();
		  Map<Long, Integer> map = null;
		  Integer totalqty = 0;
		  Double totalAmount = 0.0;
	        if (request == null) {
	            responseDTO.setSuccess(Constants.ERROR_CODE);
	            responseDTO.setMessage("Request can not be a null.");
	            return responseDTO;
	        }
	        
	        if (request.getUserId() == null) {
	            responseDTO.setSuccess(Constants.ERROR_CODE);
	            responseDTO.setMessage("UserId is null in request.");
	            return responseDTO;
	        }

	        if (request.getProductId() != null && request.getQty() != null) {
	        	
	        	Optional<User> optionalUser = userRepository.findById(request.getUserId());

		        if (optionalUser.isEmpty()) {
		            responseDTO.setSuccess(Constants.ERROR_CODE);
		            responseDTO.setMessage("User Not found with Id: " + request.getUserId());
		            return responseDTO;
		        }

		        Product product = productRepository.findById(request.getProductId()).orElse(null);

	            if (product == null) {
	                responseDTO.setSuccess(Constants.ERROR_CODE);
	                responseDTO.setMessage("Product not found with id:-" + request.getProductId());
	                return responseDTO;
	            }
	            
	            if(product.getQty() <= 0 && request.getQty() > 0 ) {
	            	 	
	            		responseDTO.setSuccess(Constants.ERROR_CODE);
		                responseDTO.setMessage("Product is not available");
		                return responseDTO;
	            }

	        	Optional<Order> ordeOptional = orderRepository.findByStatusAndUserIdAndIsDeleteFalse(OrderStatus.In_CART,request.getUserId());
	        	
	        	if(ordeOptional.isEmpty()) {
	        		
	        		map = new HashMap<>();
	        		map.put(request.getProductId(), request.getQty());
	        		CreateOrUpdateOrderRequest createOrderRequest = new CreateOrUpdateOrderRequest();
	                createOrderRequest.setUserId(request.getUserId());
	                createOrderRequest.setProductIdAndQuantityMap(map);
	                
	                return createOrder(createOrderRequest, responseDTO, optionalUser);
	        		
	        	}else {
	        		map = new HashMap<>();
	        		List<OrderDetails> orderDetails = new ArrayList<OrderDetails>();
	        		
	        		List<OrderDetails> details =  ordeOptional.get().getOrderDetails();
	        		
	        		for (OrderDetails orderDetail : details) {
						
	        			
	        			if(request.getProductId().equals(orderDetail.getProduct().getId())) {
	        				
	        				if(request.getQty() == 0) {
	        					product.setQty(product.getQty() + orderDetail.getQuantity());
	        					orderDetail.setDelete(true);
	        					
	        					orderDetailsRepository.save(orderDetail);
	        					
	        				}else if(request.getQty()> orderDetail.getQuantity()) {
	        					Integer qty = request.getQty() - orderDetail.getQuantity();
	        					product.setQty(product.getQty() - qty);
	        					
	        				}
	        				else if(request.getQty() < orderDetail.getQuantity()) {
	        					Integer qty = orderDetail.getQuantity() - request.getQty();
	        					product.setQty(product.getQty() + qty);
	        					
	        				}
	        				
	        				orderDetail.setQuantity(request.getQty());
	        			
	        			}
	        			productRepository.save(product);
        				
	        			if(orderDetail.getQuantity() > 0) {
	        				orderDetails.add(orderDetail);
	        			}
	        			
	        	       	Double orderItemPrice = orderDetail.getProduct().getPrice() * orderDetail.getQuantity();
	    	            totalAmount = totalAmount + orderItemPrice;
	    	            
	    	            totalqty = totalqty + orderDetail.getQuantity();
	        			
					}
	        		
	        		OrderDetails matchingObject = details.stream().
	        			    filter(o -> o.getProduct().getId().equals(request.getProductId()))
	        			    .findAny().orElse(null);
	        		
	        		if(matchingObject == null) {
	        			
	        			Double orderItemPrice = product.getPrice() * request.getQty();
        	            totalAmount = totalAmount + orderItemPrice;
        	            totalqty = totalqty + request.getQty();
        	            
	        			OrderDetails orderDetail = new OrderDetails();
	        			orderDetail.setAmount(product.getPrice());
	        			orderDetail.setDelete(false);
	        			orderDetail.setOrder(ordeOptional.get());
	        			orderDetail.setProduct(product);
	        			orderDetail.setQuantity(request.getQty());
	        			orderDetails.add(orderDetail);
	        			
	        			product.setQty(product.getQty() - request.getQty());
	        			productRepository.save(product);
	        			
	        		}
	        		
	        		ordeOptional.get().setTotalAmount(totalAmount);
	        		ordeOptional.get().setUpdatedAt(new Date());
	        		ordeOptional.get().setOrderDetails(orderDetails);
	        		ordeOptional.get().setId(ordeOptional.get().getId());
	        		ordeOptional.get().setTotalqty(totalqty);
	        		
	        		orderRepository.save(ordeOptional.get());
	        		responseDTO.setSuccess(Constants.SUCESS_CODE);
        	        responseDTO.setMessage("Add to Cart Order Created successfully.");
        	        responseDTO.setData(OrderDTO.build(ordeOptional.get()));
        	        return responseDTO;
	        	}
	        	
	           
	        }else {
	        	
	        	responseDTO.setSuccess(Constants.ERROR_CODE);
	            responseDTO.setMessage("productItemId and quantity map must not be a empty.");
	            return responseDTO;
	        }

		
	}
}
	
